const mongoose = require("mongoose");

const comentarioSchema = new mongoose.Schema({
  contenido: {
    type: String,
    required: true,
  },
  producto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Producto",
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
  },
  fecha: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Comentario", comentarioSchema);
