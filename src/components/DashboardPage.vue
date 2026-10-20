<template>
  <nav class="navbar">
    <router-link to="/formhorario" class="horario-link">Cadastrar Horário</router-link>
  </nav>

  <div class="dashboard">
    <h2 class="title">Tela Administrativa</h2>
    <div class="filters">
      <input
        type="text"
        v-model="search"
        placeholder="Buscar nome de cliente"
        @input="filterAppointments"
      />
    </div>

    <table class="appointments-table">
      <thead>
        <tr>
          <th>Cliente</th>
          <th>Serviço</th>
          <th>Subserviço</th>
          <th>Data</th>
          <th>Hora</th>
          <th>Contato</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="appointment in filteredAppointments" :key="appointment.id">
          <td>{{ appointment.nomeCliente }}</td>
          <td>{{ appointment.servico }}</td>
          <td>{{ appointment.subServico }}</td>
          <td>{{ formatDate(appointment.dia) }}</td>
          <td>{{ appointment.horario }}</td>
          <td>{{ appointment.telefone }}</td>
          <td>
            <div class="action-buttons">
              <button class="btn-complete" @click="confirmDelete1(appointment.id)">
                ✅ Serviço realizado
              </button>
              <button class="btn-delete" @click="confirmDelete(appointment.id)">
                🗑️ Excluir
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="showModal" class="modal-overlay">
      <div class="modal">
        <h2>Confirmar</h2>
        <p>Tem certeza que deseja realizar essa ação?</p>
        <button @click="deleteAppointment">Sim</button>
        <button @click="closeModal">Não</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "DashboardPage",
  data() {
    return {
      search: "",
      appointments: [],
      filteredAppointments: [],
      showModal: false,
      appointmentToDelete: null,
    };
  },
  created() {
    this.fetchAppointments();
  },
  methods: {
    async fetchAppointments() {
      try {
        const response = await axios.get('http://localhost:3000/api/agendamento');
        this.appointments = response.data;
        this.filteredAppointments = this.appointments;
      } catch (error) {
        console.error('Erro ao buscar agendamentos:', error);
      }
    },
    filterAppointments() {
      const normalizeString = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

      const searchNormalized = normalizeString(this.search);

      this.filteredAppointments = this.appointments.filter((appointment) => {
        return (
          normalizeString(appointment.nomeCliente).includes(searchNormalized) ||
          normalizeString(appointment.servico).includes(searchNormalized) ||
          normalizeString(appointment.horario).includes(searchNormalized)
        );
      });
    },
    formatDate(dayOfWeek) {
      const nextDate = this.getNextDayOfWeek(dayOfWeek);
      const options = { day: "2-digit", month: "2-digit", year: "numeric" };
      const formattedDate = nextDate.toLocaleDateString("pt-BR", options);
      const daysOfWeek = ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"];
      const dayOfWeekFormatted = daysOfWeek[nextDate.getDay()];
      return `${formattedDate} - ${dayOfWeekFormatted}`;
    },
    getNextDayOfWeek(dayOfWeek) {
      const daysOfWeek = ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"];
      const today = new Date();
      const dayIndex = daysOfWeek.indexOf(dayOfWeek.toLowerCase());
      const todayIndex = today.getDay();
      const daysUntilNext = (dayIndex - todayIndex + 7) % 7;
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + daysUntilNext);
      return nextDate;
    },
    confirmDelete(id) {
      this.appointmentToDelete = id;
      this.showModal = true;
    },
    async deleteAppointment() {
      try {
        await axios.delete(`http://localhost:3000/api/agendamento/${this.appointmentToDelete}`);
        this.fetchAppointments();
        this.closeModal();
      } catch (error) {
        console.error('Erro ao excluir agendamento:', error);
        alert('Erro ao excluir agendamento. Tente novamente.');
      }
    },
    closeModal() {
      this.showModal = false;
      this.appointmentToDelete = null;
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

body {
  font-family: 'Poppins', sans-serif;
  margin: 0;
  background-color: #f4f4f9;
}

/* Navbar Centralizada e Refinada */
.navbar {
  background-color: #e2229f;
  padding: 15px 30px;
  margin: 0 auto;
  width: fit-content;
  border-radius: 10px;
  margin-top: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  margin-top: -80px;
}

.horario-link {
  color: white;
  font-weight: 600;
  text-decoration: none;
  font-size: 18px;
}

.horario-link:hover {
  text-decoration: underline;
}

/* Painel principal */
.dashboard {
  padding: 30px;
  max-width: 1200px;
  margin: 30px auto;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

/* Título */
.title {
  text-align: center;
  font-size: 2.0rem;
  color: #2c3e50;
  margin-bottom: 30px;
  font-weight: 600;
}

/* Filtros */
.filters {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.filters select,
.filters input {
  padding: 10px 15px;
  border-radius: 8px;
  font-size: 16px;
  border: 2px solid #e2229f;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.filters select:focus,
.filters input:focus {
  outline: none;
  border-color: #e2229f;
  box-shadow: 0 0 5px rgba(226, 34, 159, 0.3);
}

/* Tabela de Agendamentos */
.appointments-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.appointments-table th,
.appointments-table td {
  border: 1px solid #ddd;
  padding: 14px;
  text-align: center;
  font-size: 16px;
}

.appointments-table th {
  background-color: #e2229f;
  color: white;
  font-weight: 600;
}

.appointments-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

/* Botões de Ação */
.action-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
}

.btn-complete,
.btn-delete {
  padding: 10px 18px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  transition: background-color 0.3s;
}

.btn-complete {
  background-color: #ffffff;
  color: rgb(0, 0, 0);
}

.btn-complete:hover {
  background-color: #fcfffe;
}
table {
  font-family: 'Arial', sans-serif;
  font-size: 14px;
}
td, th {
  font-size: 14px;
}
th {
  color: white;
  background-color: #E2229F; /* bom contraste já */
}

td {
  color: #333;
}
td, th {
  padding: 8px 12px;
  text-align: left;
  vertical-align: top;
}
td:nth-child(3) {
  max-width: 200px;
  word-wrap: break-word;
  white-space: normal;
}
tr:hover {
  background-color: #f1f1f1;
}


.btn-delete {
  background-color: #ffffff;
  color: rgb(0, 0, 0);
}

.btn-delete:hover {
  background-color: #ffffff;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: white;
  padding: 30px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
}

.modal h2 {
  margin-bottom: 15px;
  font-size: 1.6rem;
  color: #333;
}

.modal p {
  margin-bottom: 20px;
  font-size: 1rem;
  color: #555;
}

.modal button {
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  margin: 0 10px;
  background-color: #e2229f;
  color: white;
  transition: background-color 0.3s;
}

.modal button:hover {
  background-color: #c41887;
}

/* Input Global */
input {
  width: 100%;
  padding: 10px 15px;
  font-size: 1rem;
  border: 2px solid #e2229f;
  color: #333;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  box-sizing: border-box;
  transition: border-color 0.3s, box-shadow 0.3s;
}

input:focus {
  border-color: #e2229f;
  outline: none;
  box-shadow: 0 0 5px rgba(226, 34, 159, 0.3);
}
</style>
