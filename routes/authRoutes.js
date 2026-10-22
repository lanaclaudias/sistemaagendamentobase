const express = require('express');
const router = express.Router();
const { loginUsuario } = require('../controller/AuthController');

router.post('/login', loginUsuario);

module.exports = router;