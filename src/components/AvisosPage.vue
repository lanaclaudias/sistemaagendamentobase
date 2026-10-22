<template>
    <div class="avisos-page">
      <h1 class="title">ATENÇÃO AS REGRAS !</h1>
      <div class="box-regras">
      <ul>
        <li v-for="aviso in avisos" :key="aviso.id">
          {{ aviso.texto }}
        </li>
      </ul>
      <button @click="navigateTo('/informacoes')" class="btn">Proximo</button>
    </div>
    
  </div>
  </template>
  
  <script>
  export default {
    name: 'AvisosPage',
  data() {
    return {
      avisos: [
      { id: 0, texto: 'Ao finalizar o agendamento clicar no botão "ENVIAR CONFIRMAÇÃO A EMPORIO DAS DIVAS" vamos receber automaticamente a notificação do seu agendamento.' },
        { id: 1, texto: 'Agendou, não compareceu, não justificou, será cobrado uma taxa como multa no valor da metade do serviço que seria prestado' },
        { id: 2, texto: 'Não veio, mas justificou em cima da hora também terá que pagar a taxa.' },
        { id: 3, texto: 'Caso não pague a multa, o próximo agendamento só será realizado com 50% adiantado. Pagando e não comparecendo, não haver reembolso e não servirá para um próximo agendamento.' },
        { id: 4, texto: 'Não tragam acompanhantes, a não ser que esteja com criança.' },
        { id: 5, texto: 'Evitem atrasos' }
      ]
    };
  },
  methods: {
    navigateTo(path) {
      this.$router.push(path);
    }
  }
};
  </script>
  
  <style scoped>
 @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Dancing+Script:wght@700&display=swap');
  .avisos-page {
    text-align: center;
    padding: 20px;
    font-family: 'Inter', sans-serif;
  }
  .title {
  font-family: 'Dancing Script', cursive;
  font-size: 1.5rem;
  color: #e2229f;
  margin: 0;
  margin-top: -80px;
}
  h1 {
    color: #e2229f;
    font-size: 26px;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
  border: 2px solid #e2229f;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 15px;
  background-color: #fff;
  list-style: none;
  font-weight: bold;
  text-align: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
}

  button {
  background-color: #e2229f;
  color: rgb(255, 254, 252);
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
}

button:hover {
  background-color: #161616;
}
@media (min-width: 768px) {
  .avisos-page {
    max-width: 800px;
    margin: 0 auto;
    padding: 40px 20px;
    margin: -100px auto;
  }

  .title {
    font-size: 2.5rem;
    margin-top: -30px;
  }

  ul {
    padding: 0 20px;
  }

  li {
    font-size: 1.1rem;
    padding: 20px;
    margin-bottom: 20px;
  }

  button {
    font-size: 18px;
    padding: 12px 30px;
    margin-top: 30px;
  }
}
  </style>