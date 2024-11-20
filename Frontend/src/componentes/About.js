import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MIS_URL } from './MiVariable'; // Ajusta la importación según tu estructura

const About = ({ isAdmin }) => {
  const [mission, setMission] = useState('');
  const [vision, setVision] = useState('');
  const [editing, setEditing] = useState(false);

  // Fetch mission and vision from the public endpoint
  const fetchMissionAndVision = async () => {
    try {
      const response = await axios.get(`${MIS_URL}/api/company-profile/public`);
      setMission(response.data.identidadEmpresa?.mision || 'No disponible');
      setVision(response.data.identidadEmpresa?.vision || 'No disponible');
    } catch (error) {
      console.error('Error fetching mission and vision:', error);
    }
  };

  // Call fetchMissionAndVision when the component loads
  useEffect(() => {
    fetchMissionAndVision();
  }, []);

  // Handle the submission of the updated values
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${MIS_URL}/api/company-profile/public`, { mission, vision });
      fetchMissionAndVision(); // Refresh the data after saving
      setEditing(false);
      alert('Misión y Visión actualizadas con éxito');
    } catch (error) {
      console.error('Error updating mission and vision:', error);
      alert('Hubo un error al actualizar');
    }
  };

  return (
    <div className="container mx-auto px-6 py-10 mt-20">
      <h1 className="text-4xl font-bold text-center mb-6">Quiénes Somos</h1>

      {editing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-bold mb-2">Misión</label>
            <textarea
              className="w-full p-2 border rounded-lg"
              value={mission}
              onChange={(e) => setMission(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Visión</label>
            <textarea
              className="w-full p-2 border rounded-lg"
              value={vision}
              onChange={(e) => setVision(e.target.value)}
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg">
            Guardar
          </button>
        </form>
      ) : (
        <div>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            <strong>Misión: </strong>{mission}
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            <strong>Visión: </strong>{vision}
          </p>
          {isAdmin && (
            <button onClick={() => setEditing(true)} className="bg-green-500 text-white py-2 px-4 rounded-lg">
              Editar
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default About;
