const express = require("express");
const router = express.Router();
const Comentario = require("../models/comentario");

router.get("/comentarios/producto/:productoId", async (req, res) => {
  try {
    const comentarios = await Comentario.find({
      producto: req.params.productoId,
    });
    res.json(comentarios);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener comentarios" });
  }
});

router.post("/comentarios", async (req, res) => {
  try {
    const nuevoComentario = await Comentario.create(req.body);
    res.json(nuevoComentario);
  } catch (error) {
    res.status(500).json({ error: "No se pudo crear el comentario" });
  }
});

router.put("/comentarios/:id", async (req, res) => {
  try {
    const comentarioActualizado = await Comentario.findByIdAndUpdate(
      req.params.id,
      {
        contenido: req.body.contenido,
      },
      { new: true }
    );

    if (!comentarioActualizado) {
      return res.status(404).json({ error: "Comentario no encontrado" });
    }

    res.json(comentarioActualizado);
  } catch (error) {
    res.status(500).json({ error: "No se pudo actualizar el comentario" });
  }
});

router.delete("/comentarios/:id", async (req, res) => {
  try {
    const comentarioEliminado = await Comentario.findByIdAndRemove(
      req.params.id
    );

    if (!comentarioEliminado) {
      return res.status(404).json({ error: "Comentario no encontrado" });
    }

    res.json({ message: "Comentario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "No se pudo eliminar el comentario" });
  }
});

module.exports = router;
