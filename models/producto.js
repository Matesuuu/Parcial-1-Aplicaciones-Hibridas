const mongoose = require("mongoose");

const productoSchema = new mongoose.Schema({
  nombre: String,
  price: Number,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categoria",
  },
});

module.exports = mongoose.model("Producto", productoSchema);
const Producto = mongoose.model("Producto", productoSchema);

module.exports = Producto;
