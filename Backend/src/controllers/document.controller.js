import Document from '../models/Documents.js';
import mongoose from 'mongoose';

// Registrar un nuevo documento regulatorio
export const createDocument = async (req, res) => {
  try {
    const { title, content, effectiveDate } = req.body;

    if (!title || !content || !effectiveDate) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    if (isNaN(new Date(effectiveDate).getTime())) {
      return res.status(400).json({ message: "La fecha efectiva no es válida" });
    }

    const newDocument = new Document({
      title,
      content,
      effectiveDate,
      version: 1,
      status: "vigente"
    });

    await newDocument.save();

    console.log(`Documento creado: ${newDocument._id}`);
    res.status(201).json(newDocument);
  } catch (error) {
    console.error("Error al crear documento:", error);
    res.status(500).json({ message: `Error al crear documento: ${error.message}` });
  }
};

// Modificar el contenido de un documento (crea una nueva versión)
export const updateDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID de documento no válido" });
    }

    if (!content || content.trim() === "") {
      return res.status(400).json({ message: "El contenido no puede estar vacío" });
    }

    const currentDocument = await Document.findById(id);
    if (!currentDocument || currentDocument.isDeleted) {
      return res.status(404).json({ message: "Documento no encontrado o ya eliminado" });
    }

    // Marcar la versión actual como "no vigente"
    currentDocument.status = "no vigente";
    await currentDocument.save();

    // Crear una nueva versión
    const newVersion = new Document({
      title: currentDocument.title,
      content,
      effectiveDate: currentDocument.effectiveDate,
      version: currentDocument.version + 1,
      status: "vigente",
      isDeleted: false
    });

    await newVersion.save();

    console.log(`Documento actualizado: ID anterior: ${currentDocument._id}, Nueva versión: ${newVersion._id}`);
    res.status(200).json(newVersion);
  } catch (error) {
    console.error("Error al actualizar documento:", error);
    res.status(500).json({ message: `Error al actualizar documento: ${error.message}` });
  }
};

// Marcar documento como eliminado lógicamente
export const deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID de documento no válido" });
    }

    const document = await Document.findById(id);
    if (!document || document.isDeleted) {
      return res.status(404).json({ message: "Documento no encontrado o ya eliminado" });
    }

    document.isDeleted = true;
    document.status = "no vigente";
    await document.save();

    console.log(`Documento eliminado: ${id}`);
    res.status(200).json({ message: "Documento marcado como eliminado" });
  } catch (error) {
    console.error("Error al eliminar documento:", error);
    res.status(500).json({ message: `Error al eliminar documento: ${error.message}` });
  }
};

// Consultar la versión vigente del documento
export const getCurrentVersion = async (req, res) => {
  try {
    const currentDocument = await Document.findOne({ status: "vigente", isDeleted: false });
    if (!currentDocument) {
      return res.status(404).json({ message: "No hay una versión vigente" });
    }
    res.status(200).json(currentDocument);
  } catch (error) {
    console.error("Error al obtener documento vigente:", error);
    res.status(500).json({ message: `Error al obtener documento vigente: ${error.message}` });
  }
};

// Consultar historial de versiones de un documento
export const getDocumentHistory = async (req, res) => {
  try {
    const { title } = req.params;
    if (!title || title.trim() === "") {
      return res.status(400).json({ message: "El título proporcionado no es válido" });
    }

    const history = await Document.find({ title, isDeleted: false }).sort({ version: -1 });
    if (!history.length) {
      return res.status(404).json({ message: "No se encontró historial para este documento" });
    }

    res.status(200).json(history);
  } catch (error) {
    console.error("Error al obtener historial de versiones:", error);
    res.status(500).json({ message: `Error al obtener historial de versiones: ${error.message}` });
  }
};
