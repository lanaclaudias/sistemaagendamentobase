<template>
  <div class="login">
    <h1 class="title">Login</h1>
    <form @submit.prevent="login" class="login-form">
      <div class="form-group">
        <label for="username">Usuário</label>
        <input type="text" id="username" v-model="inputUsername" placeholder="Digite seu nome de usuário" required />
      </div>
      <div class="form-group">
        <label for="password">Senha</label>
        <input type="password" id="password" v-model="inputPassword" placeholder="Digite sua senha" required />
      </div>
      <button type="submit">Entrar</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "LoginPage",
  data() {
    return {
      inputUsername: '',
      inputPassword: ''
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:3000/api/login', {
          username: this.inputUsername,
          password: this.inputPassword
        });
        console.log('Login bem-sucedido:', response.data);
        this.$router.push('/administracao');
      } catch (error) {
        console.error('Erro ao fazer login:', error);
        alert('Usuário ou senha inválidos');
      }
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Dancing+Script:wght@700&display=swap');

.login {
  max-width: 400px;
  margin: 60px auto;
  padding: 30px 25px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.08);
  font-family: 'Inter', sans-serif;
  margin-top: -140px;
}

.title {
  font-family: 'Dancing Script', cursive;
  font-size: 2.8rem;
  color: #e2229f;
  text-align: center;
  margin-bottom: 30px;
}

.login-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-weight: 600;
  margin-bottom: 8px;
  color: #333;
  margin-right: 100%;
}

input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
  transition: border 0.3s, box-shadow 0.3s;
}

input:focus {
  border-color: #e2229f;
  box-shadow: 0 0 0 3px rgba(226, 34, 159, 0.15);
  outline: none;
}

button {
  width: 40%;
  padding: 12px;
  background-color: #e2229f;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 17px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-left: 30%;
}

button:hover {
  background-color: #c01d8a;
}

@media (min-width: 768px) {
  .login {
    padding: 40px;
  }

  input {
    font-size: 17px;
  }

  button {
    font-size: 18px;
  }
}
</style>
