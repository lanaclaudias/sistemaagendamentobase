const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const HorarioDisponiveis = require('./formHora');

const Agendamento = sequelize.define('Agendamento', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nomeCliente: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  servico: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subServico: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  dia: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  horario: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  horarioId: {
    type: DataTypes.INTEGER,
    references: {
      model: HorarioDisponiveis,
      key: 'id'
    },
    allowNull: true,
  }
}, {
  tableName: 'agendamentos',
  timestamps: true,
});

Agendamento.belongsTo(HorarioDisponiveis, {
  foreignKey: 'horarioId',
  targetKey: 'id',
  as: 'horarioDisponivel'
});

module.exports = Agendamento;