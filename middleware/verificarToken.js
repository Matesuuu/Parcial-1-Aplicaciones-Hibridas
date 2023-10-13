const jwt = require("jsonwebtoken");
const secretKey = "mateoGarciaBermudez";

function verificarToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }

  jwt.verify(token.split(" ")[1], secretKey, (err, usuario) => {
    if (err) {
      return res.status(403).json({ error: "Token no válido" });
    }
    req.usuario = usuario;
    next();
  });
}

module.exports = verificarToken;
