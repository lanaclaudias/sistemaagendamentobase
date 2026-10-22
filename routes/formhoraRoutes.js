const express = require('express');
const { createHorario, getHorarios, deleteSpecificHorario, deleteAgendamentoEHorario } = require('../controller/FormhoraController'); // Corrija o caminho se necessário

const router = express.Router();

router.post('/horarios', createHorario); // Exemplo de rota para criar horário
router.get('/horarios', getHorarios); // Exemplo de rota para obter horários

router.delete('/horarios/specific', deleteSpecificHorario);
router.delete('/agendamento/:id', deleteAgendamentoEHorario);
module.exports = router;