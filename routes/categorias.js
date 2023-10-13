const express = require("express");
const router = express.Router();
const Categoria = require("../models/categoria");

router.get("/categorias/", async (req, res) => {
  try {
    const categorias = await Categoria.find();
    res.json(categorias);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/categorias/", async (req, res) => {
  const nuevaCategoria = new Categoria(req.body);
  try {
    const categoriaGuardada = await nuevaCategoria.save();
    res.status(201).json(categoriaGuardada);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/categorias/:id", async (req, res) => {
  try {
    const categoria = await Categoria.findById(req.params.id);
    if (!categoria) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }
    res.json(categoria);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.patch("/categorias/:id", async (req, res) => {
  try {
    const categoria = await Categoria.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!categoria) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }
    res.json(categoria);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/categorias/:id", async (req, res) => {
  try {
    const categoria = await Categoria.findByIdAndRemove(req.params.id);
    if (!categoria) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }
    res.json({ message: "Categoría eliminada" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
