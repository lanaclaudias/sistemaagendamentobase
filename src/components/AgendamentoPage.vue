<template>
  <div class="agendamento">
    <h1 class="title">Agendamento</h1>

    <div class="cliente">
      <h2>Nome</h2>
      <input type="text" v-model="nomeCliente" placeholder="Digite seu nome">
    </div>
    <div class="select-dia">
      <h2>Selecione um dia da semana</h2>
      <select v-model="selectedDay">
        <option disabled value="">Selecione um dia</option>
        <option v-for="day in daysOfWeek" :key="day" :value="day">
          {{ day }}
        </option>
      </select>
    </div>

   
    <div class="select-horarios">
      <h2>Selecione um horário</h2>
      <select v-model="selectedTime">
        <option disabled value="">Horários disponíveis</option>
        <option v-for="timeObj in availableTimes[selectedDay]" :key="timeObj.time" :value="timeObj.time" :disabled="timeObj.agendado">
          {{ timeObj.time }} <span v-if="timeObj.agendado">(Agendado)</span>
        </option>
      </select>
    </div>


    <div class="telefone">
      <h2>Informe seu número de telefone</h2>
      <input type="tel" v-model="phoneNumber" placeholder="(XX) XXXXX-XXXX">
    </div>

    <div class="select-servico">
      <h2>Qual serviço você deseja?</h2>
      <select v-model="selectedService">
        <option disabled value="">Selecione um serviço</option>
        <option v-for="service in services" :key="service" :value="service">
          {{ service }}
        </option>
      </select>
    </div>

    <div v-if="selectedService === 'Designer de Sobrancelha'" class="select-subservico">
      <h2>Selecione o Tipo de Designer</h2>
      <select v-model="selectedSubService">
        <option disabled value="">Selecione um tipo</option>
        <option v-for="subService in subServicesDesigner" :key="subService" :value="subService">
          {{ subService }}
        </option>
      </select>
    </div>
 

    <div v-if="selectedService === 'Depilação a Cera'" class="select-subservico">
  <h2>Selecione os Tipos de Depilação</h2>
  <select v-model="selectedSubService" multiple>
    <option v-for="subService in subServicesDepilacao" :key="subService" :value="subService">
      {{ subService }}
    </option>
  </select>


  
</div>

<div v-if="selectedService === 'Depilação a Laser'" class="select-subservico">
  <h2>Selecione os Tipos de Depilação a Laser</h2>
  <select v-model="selectedSubService" multiple>
    <option v-for="subService in subServicesDepilacaoLaser" :key="subService" :value="subService">
      {{ subService }}
    </option>
  </select>
</div>

<div v-if="selectedService === 'Limpeza de Pele Facial'" class="select-subservico">
  <h2>Selecione o Tipo de Limpeza de Pele</h2>
  <select v-model="selectedSubService">
    <option disabled value="">Selecione um tipo</option>
    <option v-for="subService in subServicesLimpezaPele" :key="subService" :value="subService">
      {{ subService }}
    </option>
  </select>
</div>



<ul>
  <li v-for="(item, index) in servicesList" :key="index">
    <strong>{{ item.servico }}</strong> - {{ Array.isArray(item.subServico) ? item.subServico.join(", ") : item.subServico }}
    <button @click="removeService(index)" class="btn-lixeira">
      <svg xmlns="http://www.w3.org/2000/svg" class="icon-lixeira" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="3 6 5 6 21 6"></polyline>
        <path d="M19 6l-2 14H7L5 6"></path>
        <path d="M10 11v6"></path>
        <path d="M14 11v6"></path>
        <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"></path>
      </svg>
    </button>
  </li>
</ul>
<button @click="addService">Adicionar Serviço</button>

    <div>
      <button @click="submitForm">Finalizar agendamento</button>
    </div>
    <div v-if="showModal" class="modal-overlay">
  <div class="modal" ref="modalContent">
    <h2>Novo Agendamento</h2>
    <p><strong>Nome:</strong> {{ nomeCliente }}</p>
    <p><strong>Serviços:</strong></p>
    <ul>
      <li v-for="(item, index) in servicesList" :key="index">
        {{ item.servico }} - 
        <span v-if="Array.isArray(item.subServico)">
          {{ item.subServico.join(", ") }}
        </span>
        <span v-else>
          {{ item.subServico }}
        </span>
      </li>
    </ul>
    <p><strong>Dia:</strong> {{ selectedDay }}</p>
    <p><strong>Horário:</strong> {{ selectedTime }}</p>
    <p><strong>Telefone:</strong> {{ phoneNumber }}</p>
    <p><strong>Valor Total:</strong> R$ {{ calculateTotal() }}</p>

    <button @click="sendToWhatsApp">Enviar confirmação a EMPORIO DAS DIVAS</button>

  </div>
</div>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "AgendamentoPage",
  data() {
    return {
      selectedServices: [], // 👈 armazenar múltiplos serviços
      servicesList: [],     // 👈 armazenar o serviço com seus subserviços
      nomeCliente: '',
      selectedService: '',
      selectedSubService: [],
      selectedDay: '',
      selectedTime: '',
      phoneNumber: '',
      services: ["Designer de Sobrancelha", "Depilação a Cera", "Depilação a Laser", "Limpeza de Pele Facial"],
      subServicesDesigner: ["Designer Personalizado - R$ 25,00","Designer com Henna - R$30,00"],
      subServicesDepilacao: ["Rosto- R$ 40,00", "Axilas- R$ 30,00", "Linha alba- R$ 12,00", "Virilha Simples- R$ 40,00", "Buço- R$ 15,00", "Virilha cavada- R$ 48,00", "Íntima Completa- R$ 65,00", "Meia perna- R$ 40,00", "Pernas Completas- R$ 60,00","Bumbum- R$ 30,00","Braços- R$ 50,00", "Barriga- R$ 50,00"],
      daysOfWeek: ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"],
      availableTimes: {},
      showModal: false,
      subServicesDepilacaoLaser: [
     "Buço - R$ 60,00",
     "Mento - R$ 60,00",
      "Axilas - R$ 100,00",
     "Virilha- R$ 100,00",
     "Íntima Completa - R$ 140,00",
     "Braços - R$ 100,00",
     "Bumbum - R$ 90,00",
     "Meia Perna- R$ 90,00",
      "Perna Completas - R$ 160,00",
     "Barba- R$ 130,00",
     "Faixa da barba - R$ 80,00",
     "Peito - R$ 100,00",
     "Abdome- R$ 140,00",
    
    ],
    subServicesLimpezaPele: [
      "Limpeza facial - R$ 120,00",
    
    ],
    };
  },
  methods: {

    calculateTotal() {
  let total = 0;

  this.servicesList.forEach(service => {
    // Verifica se o subServico é um array ou uma string
    const subServices = Array.isArray(service.subServico) ? service.subServico : [service.subServico];
    subServices.forEach(subService => {
      // Extrai o valor do subserviço (assume que o valor está no formato "Nome - R$ XX,XX")
      const match = subService.match(/R\$ ?(\d+,\d+)/); // Adicionado espaço opcional após "R$"
      if (match) {
        const value = parseFloat(match[1].replace(',', '.')); // Converte para número
        total += value;
      }
    });
  });

  return total.toFixed(2); // Retorna o total com 2 casas decimais
},
    async fetchHorarios() {
  try {
    const response = await axios.get('/api/horarios');
    
    // Log da resposta da API
    console.log('Resposta da API:', response.data);

    const horarios = response.data;

    // Verifica se a resposta é um array
    if (Array.isArray(horarios)) {
      const horariosPorDia = {
        "Domingo": [],
        "Segunda-feira": [],
        "Terça-feira": [],
        "Quarta-feira": [],
        "Quinta-feira": [],
        "Sexta-feira": [],
        "Sábado": []
      };

      // Preencher os horários por dia
      horarios.forEach(horario => {
          if (horariosPorDia[horario.dayOfWeek]) {
            horariosPorDia[horario.dayOfWeek].push({
              time: horario.availableTime,
              agendado: false
            });
          }
      });

      this.availableTimes = horariosPorDia;
      await this.fetchAgendados();
    } else {
      console.error("A resposta da API não contém um array de horários.");
    }
  } catch (error) {
    console.error('Erro ao buscar horários:', error);
  }
},
selecionarServico(servico) {
    this.selectedService = servico;  // Atribui o serviço
  },
  selecionarSubServico(subServico) {
    this.selectedSubService = subServico;  // Atribui o subserviço
  },
async fetchAgendados() {
    try {
      const response = await axios.get('http://localhost:3000/api/agendamento');
      const agendamentos = response.data;

      // Atualizar a lista de horários disponíveis para marcar os horários agendados
      agendamentos.forEach(agendamento => {
        if (this.availableTimes[agendamento.dia]) {
          const index = this.availableTimes[agendamento.dia].findIndex(timeObj => timeObj.time === agendamento.horario);
          if (index !== -1) {
            this.availableTimes[agendamento.dia][index].agendado = true;
          }
        
        }
      });
    } catch (error) {
      console.error('Erro ao buscar horários agendados:', error);
    }
  },
  addService() {
    if (this.selectedService && this.selectedSubService.length > 0) {
      this.servicesList.push({
        servico: this.selectedService,
        subServico: Array.isArray(this.selectedSubService)
          ? [...this.selectedSubService]
          : this.selectedSubService
      });

      // Resetar os campos
      this.selectedService = '';
      this.selectedSubService = [];
    } else {
      alert("Por favor, selecione um serviço e pelo menos um subserviço.");
    }
  },
  removeService(index) {
    this.servicesList.splice(index, 1);
  },
async submitForm() {
    try {
      const appointmentData = {
        nomeCliente: this.nomeCliente,
      telefone: this.phoneNumber,
      servico: this.servicesList.map(service => service.servico).join(", "), // Concatena os serviços
      subServico: this.servicesList.map(service => {
        // Concatena os subserviços como string separada por vírgulas
        return Array.isArray(service.subServico) ? service.subServico.join(", ") : service.subServico;
      }),
      dia: this.selectedDay,
      horario: this.selectedTime,
      };

      const response = await axios.post('http://localhost:3000/api/agendamento', appointmentData);
      console.log('Agendamento criado com sucesso:', response.data);

      if (response.status === 201 || response.status === 200) {
        alert("Agendamento realizado com sucesso!");
        this.showModal = true;

      }
    } catch (error) {
      console.error("Erro ao cadastrar agendamento:", error);
      alert("Erro ao cadastrar agendamento. Tente novamente.");
    }
  },
    confirmAppointment() {
      if (this.selectedService && this.selectedDay && this.selectedTime && this.phoneNumber) {
        this.showModal = true;
      } else {
        alert("Por favor, selecione um serviço, um dia, um horário e informe seu número de telefone.");
      }
    },
    closeModal() {
      this.showModal = false;
      this.$router.push('/');
    },
 
    sendToWhatsApp() {

      const specificPhoneNumber = '5581997546655'; // Número fixo de destino no WhatsApp

  // Verifica se os campos obrigatórios estão preenchidos
  if (this.nomeCliente && this.servicesList.length > 0 && this.selectedDay && this.selectedTime && this.phoneNumber) {
    
    // Monta os serviços formatados
    const formattedServices = this.servicesList.map(s => {
      const sub = Array.isArray(s.subServico) ? s.subServico.join(", ") : s.subServico;
      return `- ${s.servico}: ${sub}`;
    }).join("\n");
    const totalValue = this.calculateTotal();
    // Monta a mensagem final
    const message = `Agendamento Confirmado:\n` +
                    `Nome: ${this.nomeCliente}\n` +
                    `Serviços:\n${formattedServices}\n` +
                    `Dia: ${this.selectedDay}\n` +
                    `Horário: ${this.selectedTime}\n` +
                    `Telefone: ${this.phoneNumber}`;
                    `Valor Total: R$ ${totalValue}`;
    const url = `https://wa.me/${specificPhoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');  // Abre o WhatsApp em nova aba

  } else {
    alert("Por favor, preencha todos os campos antes de enviar.");
  }
}

  },

  mounted() {
    // Fetch available times when the component mounts
    this.fetchHorarios();
    
  }


};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Dancing+Script:wght@700&display=swap');

.agendamento {
  max-width: 600px;
  margin: 0 auto;
  padding: 10px 20px 20px 20px;
  font-family: 'Inter', sans-serif;
  background-color: #fff;
  border-radius: 1rem;
  margin-top: -100px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.08);
}

.title {
  font-family: 'Dancing Script', cursive;
  font-size: 3rem;
  color: #e2229f;
  margin-bottom: 2rem;
  text-align: center;
}

h2 {
  font-size: 1.0rem;
  color: #333;
  margin-bottom: 0.5rem;
  text-align: left;
}

input,
select {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 2px solid #ccc;
  color: #333;
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
  box-sizing: border-box;
  transition: border-color 0.3s, box-shadow 0.3s;
}

input:focus,
select:focus {
  border-color: #e2229f;
  outline: none;
  box-shadow: 0 0 5px rgba(226, 34, 159, 0.3);
}


button {
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
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 1rem;
  margin-left: 27%;
}


.select-servico,
.select-subservico,
.select-dia,
.select-horarios,
.telefone {
  margin-top: 1.5rem;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal {
  background: #fff;
  padding: 2rem;
  border-radius: 1rem;
  text-align: center;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}

.modal h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #e2229f;
}

.modal p {
  margin-bottom: 0.5rem;
  color: #333;
}

.modal button {
  margin-top: 1rem;
  background-color: #e2229f;
  padding: 0.75rem 1.5rem;
  font-weight: bold;
  border-radius: 0.5rem;
  font-size: 0.7rem;
  width: auto;
}

.modal button:hover {
  background-color: #be1a87;
}
ul {
  list-style: none; /* Remove a bolinha da lista */
  padding: 0; /* Remove o espaçamento padrão */
}

li {
  margin-bottom: 10px; /* Adiciona espaçamento entre os itens, se necessário */
}

/* Estilo do botão de lixeira */
.btn-lixeira {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-left: 10px;
}

.btn-lixeira:hover .icon-lixeira {
  color: #000000; /* Muda a cor ao passar o mouse */
 
}

/* Estilo do ícone de lixeira */
.icon-lixeira {
  width: 20px;
  height: 20px;
  color: #333; /* Cor padrão do ícone */
}
</style>