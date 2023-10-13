const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/parcial", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error de conexión a MongoDB:"));
db.once("open", () => {
  console.log("Conexión exitosa a MongoDB.");
});

module.exports = mongoose;
