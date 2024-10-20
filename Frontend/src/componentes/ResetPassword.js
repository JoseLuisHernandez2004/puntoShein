import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const { token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/reset-password/${token}`, { newPassword });
      alert('Contraseña actualizada con éxito');
    } catch (error) {
      console.error(error);
      alert('Error al actualizar la contraseña');
    }
  };

  return (
    <div className="container">
      <h1>Restablecer Contraseña</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Nueva contraseña"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit">Restablecer</button>
      </form>
    </div>
  );
};

export default ResetPassword;
