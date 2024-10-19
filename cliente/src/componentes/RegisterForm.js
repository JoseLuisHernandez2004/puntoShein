import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterForm = ({ verifiedEmail }) => {
  const [formData, setFormData] = useState({
    username: '',
    nombre: '',
    apellidoP: '',
    apellidoM: '',
    telefono: '',
    email: verifiedEmail,
    password: '',
    confirmPassword: '' // Nuevo campo para repetir contraseña
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false
  });

  const navigate = useNavigate();

  // Validar que el texto solo contenga letras y tenga máximo 25 caracteres
  const validateText = (text) => /^[a-zA-ZÀ-ÿ\s]{1,25}$/.test(text);

  // Validar teléfono para que solo acepte 10 dígitos
  const validatePhoneNumber = (telefono) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(telefono);
  };

  const validatePassword = (password) => {
    const length = password.length >= 8;
    const uppercase = /[A-Z]/.test(password);
    const lowercase = /[a-z]/.test(password);
    const number = /\d/.test(password);
    const specialChar = /[@$!%*?&]/.test(password);

    setPasswordStrength({ length, uppercase, lowercase, number, specialChar });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validar nombres y apellidos
    if (['nombre', 'apellidoP', 'apellidoM'].includes(name)) {
      if (!validateText(value)) {
        setErrors((prevErrors) => ({ ...prevErrors, [name]: 'Solo se permiten letras y un máximo de 25 caracteres.' }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
      }
    }

    // Validar teléfono
    if (name === 'telefono') {
      if (!validatePhoneNumber(value)) {
        setErrors((prevErrors) => ({ ...prevErrors, telefono: 'El número de teléfono debe tener 10 dígitos.' }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, telefono: '' }));
      }
    }

    // Validar contraseña
    if (name === 'password') {
      validatePassword(value);
    }

    // Actualizar el estado del formulario
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const isPasswordStrong = () => {
    const { length, uppercase, lowercase, number, specialChar } = passwordStrength;
    return length && uppercase && lowercase && number && specialChar;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar número de teléfono
    if (!validatePhoneNumber(formData.telefono)) {
      setErrors((prevErrors) => ({ ...prevErrors, telefono: 'Número de teléfono inválido.' }));
      return;
    }

    // Validar fortaleza de la contraseña
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
      await axios.post('http://localhost:4000/api/register', formData, {
        withCredentials: true
      });
      setMessage('¡Registro exitoso! Redirigiendo a la página de inicio de sesión...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      setMessage('Error al registrar usuario.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Registrar</h1>
        {message && <p className="text-center text-green-500 mb-4">{message}</p>}
        <form onSubmit={handleSubmit} className="mb-4">
          {/* Nombre de Usuario */}
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

          {/* Nombre */}
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

          {/* Apellido Paterno */}
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

          {/* Apellido Materno */}
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

          {/* Teléfono */}
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

          {/* Email (prellenado y deshabilitado) */}
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

          {/* Contraseña */}
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
            <div className="mt-2">
              <p3 className={passwordStrength.length ? 'text-green-500' : 'text-red-500'}>Debe tener al menos 8 caracteres</p3>
              <p className={passwordStrength.uppercase ? 'text-green-500' : 'text-red-500'}>Debe tener al menos una letra mayúscula</p>
              <p className={passwordStrength.lowercase ? 'text-green-500' : 'text-red-500'}>Debe tener al menos una letra minúscula</p>
              <p className={passwordStrength.number ? 'text-green-500' : 'text-red-500'}>Debe tener al menos un número</p>
              <p className={passwordStrength.specialChar ? 'text-green-500' : 'text-red-500'}>Debe tener al menos un carácter especial (@$!%*?&)</p>
            </div>
          </div>

          {/* Repetir Contraseña */}
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
  );
};

export default RegisterForm;
