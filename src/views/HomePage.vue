<template>
  <div class="home">
    <header class="header">
      <p class="title2">Seu Espaço para Agendamentos de Designer de Sobrancelhas, Depilação e Limpeza Facial</p>
    </header>

    <section class="services">
      <div class="buttons">
        <button @click="navigateTo('/avisos')" class="btn">Agendamento</button>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  methods: {
    navigateTo(path) {
      this.$router.push(path);
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');
.header {
  text-align: center;
  padding: 20px;
  font-family: Arial, sans-serif;
}
.title {
  font-family: 'Dancing Script', cursive;
  font-size: 2.5rem;
  color: #e2229f;
  margin: 0;
}
.title2 {
  font-family: 'Dancing Script', cursive;
  font-size: 1.5rem;
  color: #bf4795;
  margin: 0;
  margin-top: -90px;
}
.services {
  text-align: center;
  padding: 20px;
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.btn {
  background-color: #e2229f;
  color: rgb(255, 255, 255);
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

.btn:hover {
  background-color: #191818;
}
p{
  font-size: 1.2rem;
  color: #e2229f;
  margin-top: 10px;
}
</style>