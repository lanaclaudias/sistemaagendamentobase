const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const agendamentoRoutes = require('./routes/agendamentoRoutes');
const formhoraRoutes = require('./routes/formhoraRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const cors = require('cors');
const app = express();
app.use(bodyParser.json());

app.use(cors({
  origin: 'http://localhost:8080'
}));


app.use('/api/auth', authRoutes);
app.use('/api', agendamentoRoutes);
app.use('/api/', formhoraRoutes);
app.use('/api', usuarioRoutes);
app.use('/api', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync();

    // Adicione este bloco para listar as tabelas conectadas
    const tables = await sequelize.getQueryInterface().showAllTables();
    console.log('Tabelas conectadas:', tables);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});