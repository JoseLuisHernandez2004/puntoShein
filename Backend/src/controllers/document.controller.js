import Document from '../models/Documents.js';
import mongoose from 'mongoose';

import { body, validationResult } from 'express-validator';

// Middleware de validación
export const validateDocument = [
  body('title')
    .notEmpty().withMessage('El título es obligatorio')
    .isIn(['Política de privacidad', 'Términos y condiciones', 'Deslinde legal'])
    .withMessage('Título no válido. Debe ser uno de los documentos regulatorios definidos'),
  
  body('content')
    .notEmpty().withMessage('El contenido es obligatorio'),
  
  body('effectiveDate')
    .notEmpty().withMessage('La fecha efectiva es obligatoria')
    .isISO8601().withMessage('La fecha efectiva no es válida')
    .toDate(),
];


// Registrar un nuevo documento regulatorio
export const createDocument = [
  ...validateDocument, // Middleware de validación
  async (req, res) => {
    // Manejar los errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, content, effectiveDate } = req.body;
      const createdBy = req.user.id;

      // Marcar cualquier documento vigente con el mismo título como 'no vigente'
      await Document.updateMany(
        { title, status: 'vigente', isDeleted: false },
        { status: 'no vigente' }
      );

      // Crear el nuevo documento con versión 1
      const newDocument = new Document({
        title,
        content,
        effectiveDate,
        createdBy,
        version: 1, // Siempre se crea con la versión 1
        status: 'vigente', // Este será el nuevo documento vigente
        createdAt: new Date(), // Registrar fecha y hora de creación
        updatedAt: new Date(), // Inicialmente igual a la de creación
      });

      await newDocument.save();

      console.log(`Documento creado: ${newDocument._id}`);
      res.status(201).json({
        message: "Documento creado exitosamente.",
        document: newDocument,
      });
    } catch (error) {
      console.error("Error al crear documento:", error);
      res.status(500).json({
        message: `Error al crear documento: ${error.message}`,
      });
    }
  },
];

// Modificar el contenido de un documento (crea una nueva versión)
export const updateDocument = [
  async (req, res) => {
    try {
      const { id } = req.params;
      const { content } = req.body;

      console.log("Datos recibidos para actualizar:", { id, content });

      // Validar que el ID del documento sea válido
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "ID de documento no válido." });
      }

      // Validar que el contenido no esté vacío
      if (!content || content.trim() === "") {
        return res.status(400).json({ message: "El contenido no puede estar vacío." });
      }

      // Obtener el documento actual
      const currentDocument = await Document.findById(id);
      if (!currentDocument || currentDocument.isDeleted) {
        return res.status(404).json({ message: "Documento no encontrado o ya eliminado." });
      }

      // Marcar cualquier otro documento vigente con el mismo título como 'no vigente'
      await Document.updateMany(
        { title: currentDocument.title, status: 'vigente', _id: { $ne: id }, isDeleted: false },
        { status: 'no vigente' }
      );

      // Marcar el documento actual como "no vigente"
      currentDocument.status = "no vigente";
      await currentDocument.save();

      // Crear una nueva versión del documento
      const newVersion = new Document({
        title: currentDocument.title,
        content,
        effectiveDate: currentDocument.effectiveDate, // Mantener la fecha efectiva original
        createdBy: currentDocument.createdBy, // Mantener el creador original
        version: currentDocument.version + 1, // Incrementar la versión
        status: "vigente", // Marcar como vigente
        modifiedBy: req.user.id, // Registrar el ID del usuario que modifica
        updatedAt: new Date(),
      });

      await newVersion.save();

      console.log(`Documento actualizado: ID: ${newVersion._id}`);
      res.status(200).json({
        message: "Documento actualizado exitosamente.",
        document: newVersion,
      });
    } catch (error) {
      console.error("Error al actualizar documento:", error);
      res.status(500).json({
        message: `Error al actualizar documento: ${error.message}`,
      });
    }
  },
];

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
export const getDocumentById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID de documento no válido" });
    }

    const document = await Document.findById(id);

    if (!document || document.isDeleted) {
      return res.status(404).json({ message: "Documento no encontrado o eliminado" });
    }

    // Asegúrate de devolver todo el contenido necesario
    res.status(200).json(document);
  } catch (error) {
    console.error("Error al obtener documento por ID:", error);
    res.status(500).json({ message: `Error al obtener documento: ${error.message}` });
  }
};
