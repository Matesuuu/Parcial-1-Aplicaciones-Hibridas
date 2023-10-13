const express = require("express");
const router = express.Router();
const Producto = require("../models/producto");
const Categoria = require("../models/categoria");

router.get("/productos", async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener productos" });
  }
});

router.get("/productos/:id", async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id).populate(
      "category"
    );

    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: "No se pudo obtener el producto" });
  }
});

router.post("/productos", async (req, res) => {
  try {
    const categoriaId = req.body.category;
    const categoria = await Categoria.findOne({ idCategoria: categoriaId });

    if (!categoria) {
      return res.status(400).json({ error: "Categoría no encontrada" });
    }

    const nuevoProducto = await Producto.create({
      nombre: req.body.nombre,
      price: req.body.price,
      category: categoria._id,
    });

    res.json(nuevoProducto);
  } catch (error) {
    res.status(500).json({ error: "No se pudo crear el producto" });
  }
});

router.put("/productos/:id", async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);

    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    const categoriaId = req.body.category;
    const categoria = await Categoria.findOne({ idCategoria: categoriaId });

    if (!categoria) {
      return res.status(400).json({ error: "Categoría no encontrada" });
    }

    producto.nombre = req.body.nombre;
    producto.price = req.body.price;
    producto.category = categoria._id;
    const productoActualizado = await producto.save();

    res.json(productoActualizado);
  } catch (error) {
    res.status(500).json({ error: "No se pudo actualizar el producto" });
  }
});

router.delete("/productos/:id", async (req, res) => {
  try {
    const productoEliminado = await Producto.findByIdAndRemove(req.params.id);

    if (!productoEliminado) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "No se pudo eliminar el producto" });
  }
});

module.exports = router;
