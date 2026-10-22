<template>
  <div class="tela-informacoes">
    <p class="descricao">
      Informações importantes para clientes de 
      <strong> Limpeza de Pele Premium e Depilação a Laser. </strong><br>
      Antes do seu atendimento, é essencial que você leia as instruções específicas para cada serviço.<br>
      Clique nos botões abaixo para baixar as orientações.
    </p>

    <div class="botoes">
      <a @click.prevent="baixarPDF('Limpezapelepremium.pdf')" class="btn">Limpeza de Pele Premium</a>
      <a @click.prevent="baixarPDF('InformativoLaser.pdf')" class="btn">Depilação a Laser</a>
    </div>

    <div class="proximo">
      <button @click="navigateTo('/agendamento')" class="btn-proximo">Próximo</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TelaInformacoes",
  methods: {
    navigateTo(path) {
      this.$router.push(path); 
    },
    async baixarPDF(nomeArquivo) {
      try {
        const response = await fetch(`/${nomeArquivo}`);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = nomeArquivo;
        link.click();
        window.URL.revokeObjectURL(url); // limpa o objeto da memória
      } catch (error) {
        console.error("Erro ao baixar o arquivo:", error);
      }
    }
  }
};
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Dancing+Script:wght@700&display=swap');

.tela-informacoes {
  font-size: 1rem;
  color: #333;
  margin: 20px auto;
  line-height: 1.6;
  text-align: justify;
  margin-top: -100px;
  max-width: 400px;
  padding: 10px;
}

.logo {
  max-width: 150px;
  margin: 0 auto 20px;
  display: block;
}

.descricao {
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 20px;
}

.botoes {
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
}

.btn {
  background-color: #e2229f;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45%;
  min-height: 50px;
  
}
.btn-proximo {
  background-color: #e2229f;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  display: inline-block;
  width: 50%;
  min-height: 50px;
  gap: 10px;
  margin-left: 20px;
}
.btn-proximo {
  margin-left: 48%;
}

.btn:hover,
.btn-proximo:hover {
  background-color: #e2229f;
}

.proximo {
  margin-top: 20px;
  margin-right: 30%;
}
</style>
