import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { MdEmail, MdPerson, MdPhone, MdLock, MdVisibility, MdVisibilityOff } from 'react-icons/md'; 

const RegisterForm = ({ verifiedEmail }) => {
  const [formData, setFormData] = useState({
    email: verifiedEmail,
    username: '',
    nombre: '',
    apellidoP: '',
    apellidoM: '',
    telefono: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false); // Estado para manejar el foco del campo de contraseña
  const navigate = useNavigate();

  const validateText = (text) => /^[a-zA-ZÀ-ÿ\s]{1,25}$/.test(text);

  const validatePassword = (password) => {
    const length = password.length >= 8;
    const uppercase = /[A-Z]/.test(password);
    const lowercase = /[a-z]/.test(password);
    const number = /\d/.test(password);
    const specialChar = /[@$!%*?&]/.test(password);
    setPasswordStrength({ length, uppercase, lowercase, number, specialChar });
  };

  const validatePhoneNumberWithAPI = async (telefono) => {
    try {
      const formattedPhone = telefono.startsWith('+') ? telefono : `+52${telefono}`;
      const response = await axios.get(
        `https://phonevalidation.abstractapi.com/v1/?api_key=91efd6efd8b8481dadc22f37931c7aa7&phone=${formattedPhone}`
      );
      if (response.data.valid) {
        setErrors((prevErrors) => ({ ...prevErrors, telefono: '' }));
        return true;
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, telefono: 'Número de teléfono inválido según el país.' }));
        return false;
      }
    } catch (error) {
      setErrors((prevErrors) => ({ ...prevErrors, telefono: 'Error al validar el número de teléfono.' }));
      return false;
    }
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;

    if (['nombre', 'apellidoP', 'apellidoM'].includes(name)) {
      const lettersOnlyValue = value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
      if (!validateText(lettersOnlyValue)) {
        setErrors((prevErrors) => ({ ...prevErrors, [name]: 'Solo se permiten letras y un máximo de 25 caracteres.' }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
      }
      setFormData({ ...formData, [name]: lettersOnlyValue });
      return;
    }

    if (name === 'telefono') {
      const numericValue = value.replace(/[^0-9]/g, '');
      if (numericValue.length === 10) {
        await validatePhoneNumberWithAPI(numericValue);
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, telefono: 'El número de teléfono debe tener 10 dígitos.' }));
      }
      setFormData({ ...formData, [name]: numericValue });
      return;
    }

    if (name === 'password') {
      validatePassword(value);
    }

    setFormData({ ...formData, [name]: value });
  };

  const isPasswordStrong = () => {
    const { length, uppercase, lowercase, number, specialChar } = passwordStrength;
    return length && uppercase && lowercase && number && specialChar;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (errors.telefono) {
      return;
    }

    if (!isPasswordStrong()) {
      setErrors((prevErrors) => ({ ...prevErrors, password: 'La contraseña es débil. Asegúrate de que cumple los requisitos.' }));
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: 'Las contraseñas no coinciden.' }));
      return;
    }

    try {
      await axios.post('https://puntoshein.onrender.com/api/register', formData, { withCredentials: true });

      Swal.fire({
        icon: 'success',
        title: '¡Registro exitoso!',
        text: 'Redirigiendo a la página de inicio de sesión...',
        timer: 2000,
        showConfirmButton: false
      });

      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: `Error al registrar usuario: ${error.response?.data?.message || 'Inténtalo de nuevo.'}`,
      });
    }
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 px-4 py-10 md:py-20">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6 md:p-10">
        <h1 className="text-2xl font-bold mb-4 text-center">Registrar</h1>

        <form onSubmit={handleSubmit} className="space-y-2">
          {/* Email Field */}
          <div>
            <label className="block text-black-600 text-md font-semibold mb-2" htmlFor="email">
              Correo Electrónico
            </label>
            <div className="flex items-center border border-black-400 rounded-full px-3 py-2 shadow-lg transition-all hover:shadow-xl">
              <MdEmail className="text-black-400 mr-3" size={24} />
              <input
                className="w-full focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-full text-blue-600 px-2 py-1 transition-all duration-300 ease-in-out"
                id="email"
                type="email"
                name="email"
                value={formData.email}
                disabled
                required
              />
            </div>
          </div>


          {/* Username Field */}
          <div>
            <label className="block text-black-600 text-md font-semibold mb-2" htmlFor="username">
              Nombre de Usuario
            </label>
            <div className="flex items-center border border-black-400 rounded-full px-3 py-2 shadow-lg transition-all hover:shadow-xl">
              <MdPerson className="text-black-400 mr-3" size={24} />
              <input
                className="w-full focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-full text-blue-600 px-2 py-1 transition-all duration-300 ease-in-out"
                id="username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                maxLength="20"
                placeholder='Ingresa un nombre de usuario'
                required
              />
            </div>
          </div>

          {/* Nombre Field */}
          <div>
            <label className="block text-black-600 text-md font-semibold mb-2" htmlFor="nombre">
              Nombre
            </label>
            <div className="flex items-center border border-black-400 rounded-full px-3 py-2 shadow-lg transition-all hover:shadow-xl">
              <MdPerson className="text-black-400 mr-3" size={24} />
              <input
                className="w-full focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-full text-blue-600 px-2 py-1 transition-all duration-300 ease-in-out"
                id="nombre"
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                maxLength="25"
                placeholder="Ingresa tu nombre"
                required
              />
            </div>
            {errors.nombre && <p className="text-red-500 text-xs italic">{errors.nombre}</p>}
          </div>


          {/* Apellido Paterno Field */}
          <div>
            <label className="block text-black-600 text-md font-semibold mb-2" htmlFor="apellidoP">
              Apellido Paterno
            </label>
            <div className="flex items-center border border-black-400 rounded-full px-3 py-2 shadow-lg transition-all hover:shadow-xl">
              <MdPerson className="text-black-400 mr-3" size={24} />
              <input
                className="w-full focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-full text-blue-600 px-2 py-1 transition-all duration-300 ease-in-out"
                id="apellidoP"
                type="text"
                name="apellidoP"
                value={formData.apellidoP}
                onChange={handleChange}
                maxLength="25"
                placeholder="Ingresa tu apellido paterno"
                required
              />
            </div>
            {errors.apellidoP && <p className="text-red-500 text-xs italic">{errors.apellidoP}</p>}
          </div>


          {/* Apellido Materno Field */}
          <div>
            <label className="block text-black-600 text-md font-semibold mb-2" htmlFor="apellidoM">
              Apellido Materno
            </label>
            <div className="flex items-center border border-black-400 rounded-full px-3 py-2 shadow-lg transition-all hover:shadow-xl">
              <MdPerson className="text-black-400 mr-3" size={24} />
              <input
                className="w-full focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-full text-blue-600 px-2 py-1 transition-all duration-300 ease-in-out"
                id="apellidoM"
                type="text"
                name="apellidoM"
                value={formData.apellidoM}
                onChange={handleChange}
                maxLength="25"
                placeholder="Ingresa tu apellido materno"
                required
              />
            </div>
            {errors.apellidoM && <p className="text-red-500 text-xs italic">{errors.apellidoM}</p>}
          </div>


          {/* Phone Number Field */}
          <div>
            <label className="block text-black-600 text-md font-semibold mb-2" htmlFor="telefono">
              Teléfono
            </label>
            <div className="flex items-center border border-black-400 rounded-full px-3 py-2 shadow-lg transition-all hover:shadow-xl">
              <MdPhone className="text-black-400 mr-3" size={24} />
              <input
                className={`w-full focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-full text-blue-600 px-2 py-1 transition-all duration-300 ease-in-out ${errors.telefono ? 'border-red-500' : ''}`}
                id="telefono"
                type="text"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                maxLength="10"
                placeholder="Ingresa tu número de teléfono"
                required
              />
            </div>
            {errors.telefono && <p className="text-red-500 text-xs italic">{errors.telefono}</p>}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-black-600 text-md font-semibold mb-2" htmlFor="password">
              Contraseña
            </label>
            <div className="flex items-center border border-black-400 rounded-full px-3 py-2 shadow-lg transition-all hover:shadow-xl">
              <MdLock className="text-black-400 mr-3" size={24} />
              <input
                className="w-full focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-full text-blue-600 px-2 py-1 transition-all duration-300 ease-in-out"
                id="password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder="Ingresa tu contraseña"
                required
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <MdVisibilityOff className="text-black-400" size={24} /> : <MdVisibility className="text-black-400" size={24} />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}

            {/* Instrucciones solo se muestran cuando el campo está en foco */}
            {isFocused && (
              <div className="mt-2 text-xs">
                <p className={passwordStrength.length ? 'text-green-500' : 'text-red-500'}>Debe tener al menos 8 caracteres</p>
                <p className={passwordStrength.uppercase ? 'text-green-500' : 'text-red-500'}>Debe tener al menos una letra mayúscula</p>
                <p className={passwordStrength.lowercase ? 'text-green-500' : 'text-red-500'}>Debe tener al menos una letra minúscula</p>
                <p className={passwordStrength.number ? 'text-green-500' : 'text-red-500'}>Debe tener al menos un número</p>
                <p className={passwordStrength.specialChar ? 'text-green-500' : 'text-red-500'}>Debe tener al menos un carácter especial (@$!%*?&)</p>
              </div>
            )}
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block text-black-600 text-md font-semibold mb-2" htmlFor="confirmPassword">
              Repetir Contraseña
            </label>
            <div className="flex items-center border border-black-400 rounded-full px-3 py-2 shadow-lg transition-all hover:shadow-xl">
              <MdLock className="text-black-400 mr-3" size={24} />
              <input
                className="w-full focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-full text-blue-600 px-2 py-1 transition-all duration-300 ease-in-out"
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Repite tu contraseña"
                required
              />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <MdVisibilityOff className="text-black-400" size={24} /> : <MdVisibility className="text-black-400" size={24} />}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-xs italic">{errors.confirmPassword}</p>}
          </div>


          <div className="mt-8 flex justify-center">
            <button
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${!isPasswordStrong() ? 'opacity-50 cursor-not-allowed' : ''}`}
              type="submit"
              disabled={!isPasswordStrong()}
            >
              Registrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
