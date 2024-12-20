import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { MIS_URL } from "./MiVariable";
import { ThemeContext } from "./Style/Tema"; // Asegúrate de que ThemeContext esté correctamente importado

const VerifyMfa = ({ setIsLoggedIn, setUserRole }) => {
  const { darkMode } = useContext(ThemeContext); // Usar el contexto para el tema
  const [mfaCode, setMfaCode] = useState(Array(6).fill(""));
  const navigate = useNavigate();
  const email = localStorage.getItem("mfaEmail"); // Obtener el email almacenado

  const handleInputChange = (e, index) => {
    const value = e.target.value;

    if (/^[0-9]?$/.test(value)) { // Permitir solo números
      const newCode = [...mfaCode];
      newCode[index] = value;
      setMfaCode(newCode);

      // Mover el foco al siguiente campo automáticamente
      if (value && index < 5) {
        const nextInput = document.getElementById(`mfaCode-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !mfaCode[index] && index > 0) {
      const prevInput = document.getElementById(`mfaCode-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = mfaCode.join("");

    if (code.length !== 6) {
      Swal.fire({
        icon: "warning",
        title: "Código MFA incompleto",
        text: "Por favor, completa el código de 6 dígitos.",
        timer: 3000,
      });
      return;
    }

    try {
      const response = await axios.post(
        `${MIS_URL}/api/verify-mfa`,
        { email, mfaCode: code },
        { withCredentials: true }
      );

      Swal.fire({
        icon: "success",
        title: "¡Verificación Exitosa!",
        text: "Redirigiendo...",
        timer: 1100,
        showConfirmButton: false,
      });

      localStorage.removeItem("mfaEmail");
      localStorage.setItem("authToken", response.data.token);
      setIsLoggedIn(true);
      setUserRole(response.data.role);

      if (response.data.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard");
      }
    } catch (error) {
      console.error("Error de verificación MFA:", error.response?.data);
      Swal.fire({
        icon: "error",
        title: "Error de Verificación",
        text: error.response?.data?.message || "Código MFA inválido. Por favor, inténtalo de nuevo.",
        timer: 3000,
      });
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center h-screen px-4 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className={`w-full max-w-md rounded-lg shadow-lg p-6 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
        <h1 className={`text-2xl font-bold mb-4 text-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>Verificar Código MFA</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className={`block text-md font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-black-600'}`}
              htmlFor="mfaCode"
            >
              Código MFA
            </label>
            <div className="flex space-x-2 justify-center">
              {Array.from({ length: 6 }).map((_, index) => (
                <input
                  key={index}
                  id={`mfaCode-${index}`}
                  className={`w-12 h-12 text-center border ${darkMode ? 'border-gray-700' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 ${darkMode ? 'focus:ring-blue-400' : 'focus:ring-blue-600'} transition-all duration-300 text-lg font-bold ${darkMode ? 'bg-gray-700' : 'bg-white'}`}
                  type="text"
                  maxLength="1"
                  value={mfaCode[index] || ""}
                  onChange={(e) => handleInputChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  required
                />
              ))}
            </div>
          </div>

          <div className="mt-6">
            <button
              className={`w-full py-2 px-4 rounded-full text-white font-bold ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-700'} transition-all duration-300`}
              type="submit"
            >
              Verificar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyMfa;
