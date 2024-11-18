const express = require('express');
const router = express.Router();
const { signup, login, logout } = require('../controllers/authController'); // Asegúrate de que los controladores estén correctamente importados

// Ruta para registrar un nuevo usuario
router.post('/signup', signup);

// Ruta para iniciar sesión (login)
router.post('/login', login);

// Ruta para cerrar sesión (logout)
router.post('/logout', logout);

module.exports = router;
