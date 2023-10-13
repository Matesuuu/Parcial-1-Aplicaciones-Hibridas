const express = require("express");
const app = express();
const db = require("./db");
const usuariosRoutes = require("./routes/usuarios");
const productosRoutes = require("./routes/productos");
const categoriasRoutes = require("./routes/categorias");
const ComentarioRoutes = require("./routes/comentarios");

app.use(express.json());

app.use("/api", usuariosRoutes);
app.use("/api", productosRoutes);
app.use("/api", categoriasRoutes);
app.use("/api", ComentarioRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`La aplicación está escuchando en el puerto ${PORT}`);
});
