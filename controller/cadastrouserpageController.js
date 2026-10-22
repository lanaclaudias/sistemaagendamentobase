const Usuario = require('../models/cadastrouserPage');
const bcrypt = require('bcrypt');

const createUsuario = async (req, res) => {
  try {
    const { username, password, confirmPassword } = req.body;

    // Verificar se as senhas coincidem
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'As senhas não coincidem' });
    }

    // Verificar se o usuário já existe
    const existingUser = await Usuario.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'Usuário já existe' });
    }

    // Criptografar a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar o novo usuário
    const usuario = await Usuario.create({
      username,
      password: hashedPassword
    });

    res.status(201).json(usuario);
  } catch (error) {
    console.error('Erro ao criar usuário:', error.message);
    res.status(400).json({ error: error.message });
  }
};


module.exports = { createUsuario };