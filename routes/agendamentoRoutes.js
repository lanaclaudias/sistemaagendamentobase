const express = require('express');
const { createAgendamento, updateAgendamento, deleteAgendamento, deleteAllAgendamentos, getAgendamentos } = require('../controller/AgendamentopageController'); // Corrija o caminho se necessário

const router = express.Router();

router.post('/agendamento', createAgendamento);
router.get('/agendamento', getAgendamentos);
router.put('/agendamento'),updateAgendamento
router.delete('/agendamento/todos', deleteAllAgendamentos);
router.delete('/agendamento/:id', deleteAgendamento);

module.exports = router;