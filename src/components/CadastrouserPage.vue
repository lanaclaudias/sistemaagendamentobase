<template>
  <div class="cadastro-user">
    <h2 class="title">Cadastro de Usuário</h2>
    <form @submit.prevent="submitForm" class="form">
      <div class="form-group">
        <label style="margin-right: 90%;" for="username">Usuário</label>
        <input type="text" id="username" v-model="username" placeholder="Digite seu nome de usuário" required />
      </div>
      <div class="form-group">
        <label style="margin-right: 90%;" for="password">Senha</label>
        <input type="password" id="password" v-model="password" placeholder="Digite sua senha" required />
      </div>
      <div class="form-group">
        <label style="margin-right: 90%;" for="confirmPassword">ConfirmarSenha</label>
        <input type="password" id="confirmPassword" v-model="confirmPassword" placeholder="Confirme sua senha" required />
      </div>
      <button type="submit">Cadastrar</button>
    </form>
  </div>
</template>

  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        username: '',
        password: '',
        confirmPassword: ''
      };
    },
    methods: {
      async submitForm() {
        if (this.password !== this.confirmPassword) {
          alert('As senhas não coincidem.');
          return;
        }
  
        try {
          const response = await axios.post('http://localhost:3000/api/usuarios', {
            username: this.username,
            password: this.password,
            confirmPassword: this.confirmPassword
          });
          console.log('Usuário cadastrado com sucesso:', response.data);
          alert('Usuário cadastrado com sucesso!');
          this.username = '';
          this.password = '';
          this.confirmPassword = '';
        } catch (error) {
          console.error('Erro ao cadastrar usuário:', error);
          alert('Erro ao cadastrar usuário. Tente novamente.');
        }
      }
    }
  };
  </script>
  
  <style scoped>
 @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Dancing+Script:wght@700&display=swap');

.cadastro-user {
  max-width: 450px;
  margin: 50px auto;
  padding: 30px 25px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.08);
  font-family: 'Inter', sans-serif;
  margin-top: -140px;
}

.title {
  font-family: 'Dancing Script', cursive;
  font-size: 2.0rem;
  color: #e2229f;
  text-align: center;
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-weight: 600;
  margin-bottom: 8px;
  color: #333;
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
  width: 50%;
  padding: 12px;
  background-color: #e2229f;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 17px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #c01d8a;
}

@media (min-width: 768px) {
  .cadastro-user {
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