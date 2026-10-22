const bcrypt = require('bcrypt');
const Usuario = require('../models/cadastrouserPage');

const loginUsuario = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Verificar se o usuário existe
    const usuario = await Usuario.findOne({ where: { username } });
    if (!usuario) {
      return res.status(400).json({ message: 'Usuário ou senha inválidos' });
    }

    // Verificar a senha
    const isPasswordValid = await bcrypt.compare(password, usuario.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Usuário ou senha inválidos' });
    }

    res.status(200).json({ message: 'Login bem-sucedido' });
  } catch (error) {
    console.error('Erro ao fazer login:', error.message);
    res.status(400).json({ error: error.message });
  }
};

module.exports = { loginUsuario };