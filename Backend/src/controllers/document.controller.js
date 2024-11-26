import Document from '../models/Documents.js';
import mongoose from 'mongoose';

// Registrar un nuevo documento regulatorio
export const createDocument = async (req, res) => {
  try {
    const { title, content, effectiveDate } = req.body;

    // Validaciones en el servidor
    if (!title || !content || !effectiveDate) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    if (!['Política de privacidad', 'Términos y condiciones', 'Deslinde legal'].includes(title)) {
      return res.status(400).json({ message: "Título no válido. Debe ser uno de los documentos regulatorios definidos" });
    }

    if (isNaN(new Date(effectiveDate).getTime())) {
      return res.status(400).json({ message: "La fecha efectiva no es válida" });
    }

    // Crear el nuevo documento
    const newDocument = new Document({
      title,
      content,
      effectiveDate,
      version: 1,
      status: "vigente",
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
// Update the document without modifying the title
export const updateDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    console.log("Datos recibidos para actualizar:", { id, content });

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

    // Update the current document
    currentDocument.content = content;
    currentDocument.version += 1;
    currentDocument.status = "vigente";
    await currentDocument.save();

    console.log(`Documento actualizado: ID: ${currentDocument._id}`);
    res.status(200).json(currentDocument);
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

// Consultar la versión vigente del documento específico
export const getCurrentVersion = async (req, res) => {
  try {
    const { title } = req.query;

    if (!title || !['Política de privacidad', 'Términos y condiciones', 'Deslinde legal'].includes(title)) {
      return res.status(400).json({ message: "Título no válido o no proporcionado" });
    }

    // Consulta con filtro de título y estado "vigente"
    const currentDocument = await Document.findOne({ title, status: "vigente", isDeleted: false });
    if (!currentDocument) {
      return res.status(404).json({ message: "No hay una versión vigente para el documento solicitado" });
    }
    res.status(200).json(currentDocument);
  } catch (error) {
    console.error("Error al obtener documento vigente:", error);
    res.status(500).json({ message: `Error al obtener documento vigente: ${error.message}` });
  }
};


// Consultar historial de versiones de un documento específico
export const getDocumentHistory = async (req, res) => {
  try {
    const { title } = req.params;

    if (!title || !['Política de privacidad', 'Términos y condiciones', 'Deslinde legal'].includes(title)) {
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
// Obtener los tres últimos documentos vigentes de cada tipo
export const getLastThreeDocuments = async (req, res) => {
  try {
    const titles = ['Política de privacidad', 'Términos y condiciones', 'Deslinde legal'];
    let documents = {};

    // Obtener los tres últimos documentos vigentes para cada título
    for (let title of titles) {
      const docs = await Document.find({ title, status: "vigente", isDeleted: false })
                                  .sort({ version: -1 })
                                  .limit(3);
      documents[title] = docs;
    }

    res.status(200).json(documents);
  } catch (error) {
    console.error("Error al obtener los tres últimos documentos vigentes:", error);
    res.status(500).json({ message: `Error al obtener los documentos: ${error.message}` });
  }
};
