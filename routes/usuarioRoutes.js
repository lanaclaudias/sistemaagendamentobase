const express = require('express');
const router = express.Router();
const { createUsuario } = require('../controller/cadastrouserpageController');

router.post('/usuarios', createUsuario);

module.exports = router;