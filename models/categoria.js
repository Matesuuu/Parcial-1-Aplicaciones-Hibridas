const mongoose = require("mongoose");

const categoriaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: String,
  idCategoria: Number,
});

module.exports = mongoose.model("Categoria", categoriaSchema);
const Categoria = mongoose.model("Categoria", categoriaSchema);

module.exports = Categoria;
