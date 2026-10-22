const Agendamento = require('../models/agendamentoPage');

const getAgendamentos = async (req, res) => {
  try {
    const agendamentos = await Agendamento.findAll();
    res.status(200).json(agendamentos);
  } catch (error) {
    console.error('Erro ao buscar agendamentos:', error.message);
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getAgendamentos };