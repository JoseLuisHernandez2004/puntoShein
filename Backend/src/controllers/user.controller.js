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
// Actualizar el rol de un usuario
export const updateUserRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  try {
    const userToUpdate = await User.findById(id);

    if (!userToUpdate) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Verificar si el usuario está intentando cambiar su propio rol
    if (userToUpdate._id.toString() === req.userId && role !== 'admin') {
      return res.status(400).json({ message: 'No puedes cambiar tu propio rol.' });
    }

    // Verificar si se intenta cambiar el rol del último administrador activo
    if (userToUpdate.role === 'admin' && role !== 'admin') {
      const activeAdmins = await User.find({
        role: 'admin',
        _id: { $ne: userToUpdate._id },
        isActive: true,
      });

      if (activeAdmins.length === 0) {
        return res.status(400).json({
          message: 'No se puede cambiar el rol del último administrador activo.',
        });
      }
    }

    userToUpdate.role = role;
    await userToUpdate.save();

    res.status(200).json(userToUpdate);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el rol del usuario' });
  }
};


export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const userToDelete = await User.findById(id);

    if (!userToDelete) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    // Verificar si el usuario está intentando eliminar su propia cuenta
    if (userToDelete._id.toString() === req.userId) {
      return res.status(400).json({ message: 'No puedes eliminar tu propia cuenta.' });
    }

    // Verificar si se intenta eliminar el último administrador activo
    if (userToDelete.role === 'admin' && userToDelete.isActive !== false) {
      const activeAdmins = await User.find({
        role: 'admin',
        _id: { $ne: userToDelete._id },
        isActive: true,
      });

      if (activeAdmins.length === 0) {
        return res.status(400).json({
          message: 'No se puede eliminar. Asigne a otro administrador para poder eliminarse.',
        });
      }
    }

    await User.findByIdAndDelete(id);
    res.status(200).json({ message: 'Usuario eliminado correctamente.' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el usuario.' });
  }
};

// Desactivar un usuario específico
export const deactivateUser = async (req, res) => {
  const { id } = req.params;

  try {
    const userToDeactivate = await User.findById(id);

    if (!userToDeactivate) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    // Verificar si el usuario está intentando desactivar su propia cuenta
    if (userToDeactivate._id.toString() === req.userId) {
      return res.status(400).json({ message: 'No puedes desactivar tu propia cuenta.' });
    }

    // Verificar si se intenta desactivar el último administrador activo
    if (userToDeactivate.role === 'admin' && userToDeactivate.isActive !== false) {
      const activeAdmins = await User.find({
        role: 'admin',
        _id: { $ne: userToDeactivate._id },
        isActive: true,
      });

      if (activeAdmins.length === 0) {
        return res.status(400).json({
          message: 'No se puede desactivar el único administrador activo.',
        });
      }
    }

    userToDeactivate.isActive = false;
    await userToDeactivate.save();

    res.status(200).json({
      message: 'Usuario desactivado correctamente.',
      user: userToDeactivate,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al desactivar el usuario.' });
  }
};
// Activar un usuario específico
export const activateUser = async (req, res) => {
  const { id } = req.params;

  try {
    const userToActivate = await User.findById(id);

    if (!userToActivate) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    // Verificar si el usuario ya está activo
    if (userToActivate.isActive === true) {
      return res.status(400).json({ message: 'El usuario ya está activo.' });
    }

    userToActivate.isActive = true;
    await userToActivate.save();

    res.status(200).json({
      message: 'Usuario activado correctamente.',
      user: userToActivate,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al activar el usuario.' });
  }
};