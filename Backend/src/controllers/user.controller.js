import User from '../models/user.model.js';

export const getUsers = async (req, res) => {
    try {
      const users = await User.find(); // Aquí se obtienen todos los usuarios
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los usuarios: ' + error.message });
    }
  };    

export const getUserById = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
  
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el usuario: ' + error.message });
    }
  };
// En el archivo 'user.controller.js'
export const updateUserRole = async (req, res) => {
    const { id } = req.params;
    const { role } = req.body;
  
    try {
      console.log(`Intentando actualizar el rol del usuario con ID: ${id} a rol: ${role}`);
      const updatedUser = await User.findByIdAndUpdate(id, { role }, { new: true });
      if (!updatedUser) {
        console.log("Usuario no encontrado");
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      console.log("Usuario actualizado correctamente:", updatedUser);
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error("Error al actualizar el rol del usuario:", error);
      res.status(500).json({ message: "Error al actualizar el rol del usuario" });
    }
  };
  
  // Eliminar un usuario específico
export const deleteUser = async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedUser = await User.findByIdAndDelete(id);
      if (!deletedUser) {
        return res.status(404).json({ message: 'Usuario no encontrado.' });
      }
      res.status(200).json({ message: 'Usuario eliminado correctamente.' });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el usuario.' });
    }
  };

  // Desactivar un usuario específico
export const deactivateUser = async (req, res) => {
    const { id } = req.params;
  
    try {
      const updatedUser = await User.findByIdAndUpdate(id, { isActive: false }, { new: true }).select('-password');
      if (!updatedUser) {
        return res.status(404).json({ message: 'Usuario no encontrado.' });
      }
      res.status(200).json({ message: 'Usuario desactivado correctamente.', user: updatedUser });
    } catch (error) {
      res.status(500).json({ message: 'Error al desactivar el usuario.' });
    }
  };