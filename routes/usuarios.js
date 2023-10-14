const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const Usuario = require("../models/usuario");

const verificarToken = require("../middleware/verificarToken");

router.get("/usuarios", verificarToken, async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
});

router.post("/registro", async (req, res) => {
  try {
    const nuevoUsuario = new Usuario({
      nombre: req.body.nombre,
      email: req.body.email,
      password: req.body.password,
    });

    await nuevoUsuario.save();

    const token = jwt.sign(
      { usuarioId: nuevoUsuario._id },
      "mateoGarciaBermudez",
      {
        expiresIn: "1h",
      }
    );
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Error en el registro de usuario" });
  }
});

router.post("/autenticacion", async (req, res) => {
  try {
    const usuario = await Usuario.findOne({ email: req.body.email });

    if (!usuario) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    if (req.body.password !== usuario.password) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    const token = jwt.sign({ usuarioId: usuario._id }, "mateoGarciaBermudez", {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Error en la autenticación de usuario" });
  }
});

router.get("/usuarios/:id", async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);

    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: "No se pudo obtener el usuario" });
  }
});

router.post("/usuarios", async (req, res) => {
  try {
    const nuevoUsuario = new Usuario({
      nombre: req.body.nombre,
      email: req.body.email,
    });

    const usuarioGuardado = await nuevoUsuario.save();

    res.status(201).json(usuarioGuardado);
  } catch (error) {
    res.status(500).json({ error: "No se pudo crear el usuario" });
  }
});

router.put("/usuarios/:id", verificarToken, async (req, res) => {
  try {
    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      req.params.id,
      {
        nombre: req.body.nombre,
        email: req.body.email,
      },
      { new: true }
    );

    if (!usuarioActualizado) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json(usuarioActualizado);
  } catch (error) {
    res.status(500).json({ error: "No se pudo actualizar el usuario" });
  }
});

router.delete("/usuarios/:id", verificarToken, async (req, res) => {
  try {
    const usuarioEliminado = await Usuario.findByIdAndRemove(req.params.id);

    if (!usuarioEliminado) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "No se pudo eliminar el usuario" });
  }
});

module.exports = router;
