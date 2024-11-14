// controllers/document.controller.js
import Document from '../models/Documents.js';

// Registrar un nuevo documento regulatorio
export const createDocument = async (req, res) => {
  try {
    const { title, content, effectiveDate } = req.body;
    const newDocument = new Document({ title, content, effectiveDate });
    await newDocument.save();
    res.status(201).json(newDocument);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Modificar el contenido de un documento (crea una nueva versión)
export const updateDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    // Marcar la versión actual como "no vigente"
    const currentDocument = await Document.findById(id);
    if (!currentDocument) return res.status(404).json({ message: "Documento no encontrado" });
    
    currentDocument.status = "no vigente";
    await currentDocument.save();

    // Crear una nueva versión
    const newVersion = new Document({
      title: currentDocument.title,
      content,
      effectiveDate: currentDocument.effectiveDate,
      version: currentDocument.version + 1,
      status: "vigente"
    });
    await newVersion.save();

    res.status(200).json(newVersion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Marcar documento como eliminado lógicamente
export const deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const document = await Document.findById(id);
    if (!document) return res.status(404).json({ message: "Documento no encontrado" });

    document.isDeleted = true;
    document.status = "no vigente";
    await document.save();

    res.status(200).json({ message: "Documento marcado como eliminado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Consultar la versión vigente del documento
export const getCurrentVersion = async (req, res) => {
  try {
    const currentDocument = await Document.findOne({ status: "vigente", isDeleted: false });
    if (!currentDocument) return res.status(404).json({ message: "No hay una versión vigente" });
    res.status(200).json(currentDocument);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Consultar historial de versiones de un documento
export const getDocumentHistory = async (req, res) => {
  try {
    const history = await Document.find({ title: req.params.title }).sort({ version: -1 });
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
