const express = require('express');
const router = express.Router();
const { getAgendamentos } = require('../controller/AgendamentopageController');

router.get('/agendamentos', getAgendamentos);
router.delete('/agendamentos/:id', deleteAgendamento);
module.exports = router;