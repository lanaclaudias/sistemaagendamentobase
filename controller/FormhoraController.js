
const express = require('express');
const cors = require('cors');
const HorarioDisponiveis = require('../models/formHora');
const {Agendamento} = require('../models/agendamentoPage');
const app = express();

// Use o middleware CORS
app.use(cors());

app.use(express.json());
// Criar um novo horário
const createHorario = async (req, res) => {
  try {
    const horario = await HorarioDisponiveis.create(req.body);
    res.status(201).json(horario); // Retorna o horário criado
  } catch (error) {
    console.error('Erro ao criar horário:', error.message); // Log do erro
    res.status(400).json({ error: error.message });
  }
};
const deleteAgendamentoEHorario = async (req, res) => {
  try {
    const agendamentoId = req.params.id;

    // Excluir o agendamento
    const agendamento = await Agendamento.findByPk(agendamentoId);
    if (!agendamento) {
      return res.status(404).send({ message: 'Agendamento não encontrado' });
    }

    // Excluir o horário correspondente
    await HorarioDisponiveis.destroy({
      where: {
        id: agendamento.horarioId
      }
    });

    // Excluir o agendamento
    await Agendamento.destroy({
      where: {
        id: agendamentoId
      }
    });

    res.send({ message: 'Agendamento e horário excluídos com sucesso' });
  } catch (error) {
    res.status(500).send({ message: 'Erro ao excluir agendamento e horário', error });
  }
};


// Buscar todos os horários disponíveis
const getHorarios = async (req, res) => {
    try {
      // Buscar todos os registros da tabela HorarioDisponiveis
      const horarios = await HorarioDisponiveis.findAll();
      
      // Log dos dados recebidos
      console.log('Horários recebidos:', horarios);
  
      // Extrair os campos necessários: availableTime e dayOfWeek
      const horariosFormatados = horarios.map(horario => ({
        dayOfWeek: horario.dayOfWeek,
        availableTime: horario.availableTime
      }));
  
      // Retornar os dados ao frontend
      res.status(200).json(horariosFormatados);
    } catch (error) {
      res.status(400).json({ error: error.message }); // Retorna erro se falhar
    }
  };
  const deleteSpecificHorario = async (req, res) => {
    try {
      const { dayOfWeek, availableTime } = req.body;
      const result = await HorarioDisponiveis.destroy({
        where: {
          dayOfWeek: dayOfWeek,
          availableTime: availableTime
        }
      });
      if (result) {
        res.status(200).json({ message: 'Horário excluído com sucesso' });
      } else {
        res.status(404).json({ message: 'Horário não encontrado' });
      }
    } catch (error) {
      console.error('Erro ao excluir horário:', error.message);
      res.status(500).json({ error: error.message });
    }
  };
  


module.exports = { createHorario, getHorarios, deleteSpecificHorario , deleteAgendamentoEHorario};
