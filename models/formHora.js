const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class HorarioDisponiveis extends Model {}

HorarioDisponiveis.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  dayOfWeek: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']],
    },
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'disponivel' // Valor padrão como disponível
  },
  availableTime: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /^([01]\d|2[0-3]):([0-5]\d)$/, // Valida no formato HH:mm
    },
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize,
  modelName: 'HorarioDisponiveis',
  tableName: 'horarios',
  timestamps: true,
});

module.exports = HorarioDisponiveis;
