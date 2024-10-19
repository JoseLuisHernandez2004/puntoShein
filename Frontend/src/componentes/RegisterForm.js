import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';  // Importar SweetAlert2

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
      // Asegúrate de que el número tenga el formato internacional con el código de país
      const formattedPhone = telefono.startsWith('+') ? telefono : `+52${telefono}`; // Aquí +52 es para México
      const response = await axios.get(
        `https://phonevalidation.abstractapi.com/v1/?api_key=c95ef61fcc7b4a10a1ccbbef8feb7903&phone=${formattedPhone}`
      );
      if (response.data.valid) {
        setErrors((prevErrors) => ({ ...prevErrors, telefono: '' })); // Teléfono válido
        return true;
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, telefono: 'Número de teléfono inválido según el país.' })); // Teléfono no válido
        return false;
      }
    } catch (error) {
      setErrors((prevErrors) => ({ ...prevErrors, telefono: 'Error al validar el número de teléfono.' }));
      console.error('Error al validar el número de teléfono:', error);
      return false;
    }
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;

    // Validar nombres y apellidos
    if (['nombre', 'apellidoP', 'apellidoM'].includes(name)) {
      if (!validateText(value)) {
        setErrors((prevErrors) => ({ ...prevErrors, [name]: 'Solo se permiten letras y un máximo de 25 caracteres.' }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
      }
    }

    // Validar teléfono y hacer la solicitud a la API de Abstract para validarlo
    if (name === 'telefono') {
      const numericValue = value.replace(/[^0-9]/g, ''); // Eliminar caracteres no numéricos
      if (numericValue.length === 10) {
        await validatePhoneNumberWithAPI(numericValue);
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, telefono: 'El número de teléfono debe tener 10 dígitos.' }));
      }
      setFormData({ ...formData, [name]: numericValue });
      return;
    }

    // Validar contraseña
    if (name === 'password') {
      validatePassword(value);
    }

    // Actualizar el estado general
    setFormData({ ...formData, [name]: value });
  };

  const isPasswordStrong = () => {
    const { length, uppercase, lowercase, number, specialChar } = passwordStrength;
    return length && uppercase && lowercase && number && specialChar;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que el número de teléfono sea válido antes de continuar
    const isPhoneValid = await validatePhoneNumberWithAPI(formData.telefono);
    if (!isPhoneValid) return;

    // Validar que la contraseña sea fuerte
    if (!isPasswordStrong()) {
      setErrors((prevErrors) => ({ ...prevErrors, password: 'La contraseña es débil. Asegúrate de que cumple los requisitos.' }));
      return;
    }

    // Validar que las contraseñas coincidan
    if (formData.password !== formData.confirmPassword) {
      setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: 'Las contraseñas no coinciden.' }));
      return;
    }

    try {
      await axios.post('http://localhost:4000/api/register', formData, { withCredentials: true });
      
      // Mostrar SweetAlert de éxito
      Swal.fire({
        icon: 'success',
        title: '¡Registro exitoso!',
        text: 'Redirigiendo a la página de inicio de sesión...',
        timer: 2000,
        showConfirmButton: false
      });

      setTimeout(() => {
        navigate('/login'); // Redirigir al login
      }, 2000);

    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al registrar usuario. Inténtalo de nuevo.',
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-5xl bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Registrar</h1>

        <div className="grid grid-cols-2 gap-8">
          {/* Formulario izquierdo */}
          <form onSubmit={handleSubmit} className="bg-gray-50 p-6 border border-gray-300 rounded-lg">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Correo Electrónico</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                name="email"
                value={formData.email}
                disabled
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Nombre de Usuario</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                maxLength="20"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">Nombre</label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.nombre ? 'border-red-500' : ''}`}
                id="nombre"
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                maxLength="25"
                required
              />
              {errors.nombre && <p className="text-red-500 text-xs italic">{errors.nombre}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apellidoP">Apellido Paterno</label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.apellidoP ? 'border-red-500' : ''}`}
                id="apellidoP"
                type="text"
                name="apellidoP"
                value={formData.apellidoP}
                onChange={handleChange}
                maxLength="25"
                required
              />
              {errors.apellidoP && <p className="text-red-500 text-xs italic">{errors.apellidoP}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apellidoM">Apellido Materno</label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.apellidoM ? 'border-red-500' : ''}`}
                id="apellidoM"
                type="text"
                name="apellidoM"
                value={formData.apellidoM}
                onChange={handleChange}
                maxLength="25"
                required
              />
              {errors.apellidoM && <p className="text-red-500 text-xs italic">{errors.apellidoM}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="telefono">Teléfono</label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.telefono ? 'border-red-500' : ''}`}
                id="telefono"
                type="text"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                maxLength="10"
                required
              />
              {errors.telefono && <p className="text-red-500 text-xs italic">{errors.telefono}</p>}
            </div>
          </form>

          {/* Formulario derecho */}
          <form onSubmit={handleSubmit} className="bg-gray-50 p-6 border border-gray-300 rounded-lg">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Contraseña</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}

              {/* Mostrar los requisitos de la contraseña */}
              <div className="mt-2 text-xs">
                <p className={passwordStrength.length ? 'text-green-500' : 'text-red-500'}>Debe tener al menos 8 caracteres</p>
                <p className={passwordStrength.uppercase ? 'text-green-500' : 'text-red-500'}>Debe tener al menos una letra mayúscula</p>
                <p className={passwordStrength.lowercase ? 'text-green-500' : 'text-red-500'}>Debe tener al menos una letra minúscula</p>
                <p className={passwordStrength.number ? 'text-green-500' : 'text-red-500'}>Debe tener al menos un número</p>
                <p className={passwordStrength.specialChar ? 'text-green-500' : 'text-red-500'}>Debe tener al menos un carácter especial (@$!%*?&)</p>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">Repetir Contraseña</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              {errors.confirmPassword && <p className="text-red-500 text-xs italic">{errors.confirmPassword}</p>}
            </div>

            <button
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${!isPasswordStrong() ? 'opacity-50 cursor-not-allowed' : ''}`}
              type="submit"
              disabled={!isPasswordStrong()}
            >
              Registrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
