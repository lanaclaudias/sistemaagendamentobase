const Agendamento = require('../models/agendamentoPage');
const HorarioDisponiveis = require('../models/formHora');
const sequelize = require('../config/database');
const { Op } = require('sequelize');
const createAgendamento = async (req, res) => {
    try {
      const { nomeCliente, telefone, servico, subServico, dia, horario } = req.body;
  
      // Verificar se o horário existe
      const horarioDisponivel = await HorarioDisponiveis.findOne({
        where: {
          dayOfWeek: dia,
          availableTime: horario
        }
      });
  
      if (!horarioDisponivel) {
        return res.status(404).json({ error: 'Horário não encontrado' });
      }
  
      const agendamento = await Agendamento.create({
        nomeCliente,
        telefone,
        servico,
        subServico: JSON.stringify(subServico),
        dia,
        horario,
        horarioId: horarioDisponivel.id
      });
  
      await horarioDisponivel.update({ status: 'indisponivel' });

      res.status(201).json(agendamento);
    } catch (error) {
      console.error('Erro ao criar agendamento:', error.message);
      res.status(400).json({ error: error.message });
    }
  };

  const getAgendamentos = async (req, res) => {
    try {
      const agendamentos = await Agendamento.findAll({
        include: {
          model: HorarioDisponiveis,
          as: 'horarioDisponivel'
        }
      });
      res.status(200).json(agendamentos);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar os agendamentos', error });
    }
  };
  
  const getAgendamentoById = async (req, res) => {
    try {
      const { id } = req.params;
      const agendamento = await Agendamento.findByPk(id, {
        include: {
          model: HorarioDisponiveis,
          as: 'horarioDisponivel'
        }
      });
  
      if (!agendamento) {
        return res.status(404).json({ message: 'Agendamento não encontrado' });
      }
  
      res.status(200).json(agendamento);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar o agendamento', error });
    }
  };
  
  const updateAgendamento = async (req, res) => {
    try {
      const { id } = req.params;
      const { nomeCliente, telefone, servico, subServico, horarioId } = req.body;
  
      const agendamento = await Agendamento.findByPk(id);
  
      if (!agendamento) {
        return res.status(404).json({ message: 'Agendamento não encontrado' });
      }
  
      // Verificar se o horário existe
      const horario = await HorarioDisponiveis.findByPk(horarioId);
      if (!horario) {
        return res.status(404).json({ error: 'Horário não encontrado' });
      }
  
      await agendamento.update({
        nomeCliente,
        telefone,
        servico,
        subServico,
        dia: horario.dayOfWeek,
        horario: horario.availableTime,
        horarioId: horario.id
      });
  
      res.status(200).json(agendamento);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar o agendamento', error });
    }
  };
  
  const deleteAgendamento = async (req, res) => {
    try {
      const { id } = req.params;
      const agendamento = await Agendamento.findByPk(id);
  
      if (!agendamento) {
        return res.status(404).json({ message: 'Agendamento não encontrado' });
      }
  
      const result = await Agendamento.destroy({
        where: {
          id: id
        }
      });
  
      if (result) {
        // Atualizar o status do horário para disponível
        const horarioDisponivel = await HorarioDisponiveis.findByPk(agendamento.horarioId);
        await horarioDisponivel.update({ status: 'disponivel' });
  
        res.status(200).json({ message: 'Agendamento excluído com sucesso' });
      } else {
        res.status(404).json({ message: 'Agendamento não encontrado' });
      }
    } catch (error) {
      console.error('Erro ao excluir agendamento:', error.message);
      res.status(400).json({ error: error.message });
    }
  };

  const deleteAllAgendamentos = async (req, res) => {
    let transaction;

    try {
      transaction = await sequelize.transaction();
      const agendamentos = await Agendamento.findAll({
        attributes: ['horarioId'],
        transaction
      });
      const horarioIds = agendamentos
        .map(({ horarioId }) => horarioId)
        .filter((horarioId) => horarioId !== null);

      await Agendamento.destroy({
        where: {},
        transaction
      });

      if (horarioIds.length > 0) {
        await HorarioDisponiveis.update(
          { status: 'disponivel' },
          {
            where: {
              id: {
                [Op.in]: horarioIds
              }
            },
            transaction
          }
        );
      }

      await transaction.commit();
      res.status(200).json({
        message: 'Agendamentos excluídos com sucesso',
        deletedCount: agendamentos.length
      });
    } catch (error) {
      if (transaction) {
        await transaction.rollback();
      }
      console.error('Erro ao excluir todos os agendamentos:', error.message);
      res.status(500).json({ error: 'Erro ao excluir todos os agendamentos' });
    }
  };

module.exports = {
  createAgendamento,
  getAgendamentos,
  getAgendamentoById,
  updateAgendamento,
  deleteAgendamento,
  deleteAllAgendamentos
};