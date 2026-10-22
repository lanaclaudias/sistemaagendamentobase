<template>
  <div class="form-hora">

    <h1 class="titulo">Cadastrar horário</h1>

    <div class="form-grupo">
      <div class="select-dia">
        <label for="select-day">Dia da semana</label>
        <select id="select-day" v-model="selectedDay">
          <option v-for="day in daysOfWeek" :key="day" :value="day">
            {{ day }}
          </option>
        </select>
      </div>

      <div class="add-horario">
        <label for="select-time">Horário</label>
        <select id="select-time" v-model="newTime">
          <option disabled value="">Selecione um horário</option>
          <option v-for="time in timeSlots" :key="time" :value="time">
            {{ time }}
          </option>
        </select>
        <button @click="submitForm">Adicionar</button>
      </div>
    </div>

    <div class="horarios-disponiveis">
      <h2>Horários Disponíveis</h2>
      <div class="table-wrapper">
        <table class="horarios-tabela">
          <thead>
            <tr>
              <th v-for="day in daysOfWeek" :key="day">{{ day }}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td v-for="day in daysOfWeek" :key="day">
                <ul class="horario-lista">
                  <li v-for="(time, index) in availableTimes[day]" :key="index">
                    {{ time }}
                    <button @click="removeTime(day, index)">
                      🗑️
                    </button>
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>
</template>


<script>
import axios from 'axios';
import { format } from "date-fns";

export default {
  name: "FormHora",
  data() {
    return {
      selectedDay: "Domingo", // Day selected for scheduling
      newTime: "", // New time to be added
      daysOfWeek: [
        "Domingo", "Segunda-feira", "Terça-feira", 
        "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"
      ],
      availableTimes: JSON.parse(localStorage.getItem('availableTimes')) || {
        "Domingo": [],
        "Segunda-feira": [],
        "Terça-feira": [],
        "Quarta-feira": [],
        "Quinta-feira": [],
        "Sexta-feira": [],
        "Sábado": []
      },
      timeSlots: this.generateTimeSlots(), // List of time slots generated dynamically
    };
  },
  methods: {
    // Method to generate time slots (from 08:00 to 21:00 every 30 minutes)
    generateTimeSlots() {
      const times = [];
      let startTime = new Date();
      startTime.setHours(1, 0, 0); // 08:00
      const endTime = new Date();
      endTime.setHours(24, 0, 0); // 21:00

      while (startTime <= endTime) {
        times.push(format(startTime, "HH:mm"));
        startTime.setMinutes(startTime.getMinutes() + 15); // Increment by 30 minutes
      }

      return times;
    },
    
    // Method to add a new time to the available times
    async submitForm() {
    if (!this.selectedDay || !this.newTime) {
      alert('Por favor, selecione um dia e um horário.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/horarios', {
        dayOfWeek: this.selectedDay,
        availableTime: this.newTime,
      });

      console.log('Horário adicionado com sucesso:', response.data);

      // Atualize a lista de horários disponíveis localmente
      this.availableTimes[this.selectedDay].push(this.newTime);
      this.newTime = ""; // Limpe o campo de horário após adicionar
      localStorage.setItem('availableTimes', JSON.stringify(this.availableTimes));
    } catch (error) {
      console.error('Erro ao adicionar horário:', error);
    }
  },

  // Método para remover um horário dos horários disponíveis
  async removeTime(day, index) {
      const timeToRemove = this.availableTimes[day][index];
      if (timeToRemove.includes('(Agendado)')) {
        alert('Não é possível remover um horário que já está agendado.');
        return;
      }
      const confirmDelete = confirm(`Tem certeza de que deseja excluir o horário ${timeToRemove} de ${day}?`);
      if (!confirmDelete) {
        return;
      }
      console.log('Removendo horário:', { dayOfWeek: day, availableTime: timeToRemove });

      try {
        const response = await axios.delete('http://localhost:3000/api/horarios/specific', {
          data: { dayOfWeek: day, availableTime: timeToRemove }
        });
        console.log('Horário removido com sucesso:', response.data);

        // Remove o horário da lista local
        this.availableTimes[day].splice(index, 1);
        localStorage.setItem('availableTimes', JSON.stringify(this.availableTimes));
      } catch (error) {
        console.error('Erro ao remover horário:', error);
      }
    },

  async fetchAgendados() {
    try {
      const response = await axios.get('http://localhost:3000/api/agendamento');
      const agendamentos = response.data;

      // Atualizar a lista de horários disponíveis para marcar os horários agendados
      agendamentos.forEach(agendamento => {
        if (this.availableTimes[agendamento.dia]) {
          const index = this.availableTimes[agendamento.dia].indexOf(agendamento.horario);
          if (index !== -1) {
            this.availableTimes[agendamento.dia][index] += ' (Agendado)';
          }
        }
      });
      localStorage.setItem('availableTimes', JSON.stringify(this.availableTimes));
    } catch (error) {
      console.error('Erro ao buscar horários agendados:', error);
    }
  },


  // Método para buscar horários disponíveis do back-end
  async fetchAvailableTimes() {
    try {
      const response = await axios.get('http://localhost:3000/api/horarios');
      const horarios = response.data;

      // Limpar a lista de horários disponíveis antes de preencher
      this.availableTimes = {
        "Domingo": [],
        "Segunda-feira": [],
        "Terça-feira": [],
        "Quarta-feira": [],
        "Quinta-feira": [],
        "Sexta-feira": [],
        "Sábado": []
      };

      // Popula os horários disponíveis com dados do back-end
      horarios.forEach(horario => {
        if (this.availableTimes[horario.dayOfWeek]) {
          this.availableTimes[horario.dayOfWeek].push(horario.availableTime);
        }
      });

      // Buscar horários agendados e atualizar a lista de horários disponíveis
      await this.fetchAgendados();

      localStorage.setItem('availableTimes', JSON.stringify(this.availableTimes));
    } catch (error) {
      console.error('Erro ao buscar horários:', error);
    }
  }
}
,
  mounted() {
    // Fetch available times when the component mounts
    this.fetchAvailableTimes();
  }
};
</script>

<style scoped>
.form-hora {
  max-width: 900px;
  margin: 0 auto;
  padding: 30px 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin-top: -90px;
}

.titulo {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 30px;
  color: #333;
}

.form-grupo {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 40px;
}

.select-dia,
.add-horario {
  flex: 1;
  min-width: 250px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

label {
  font-weight: 600;
  color: #333;
}

select {
  padding: 10px;
  border: 2px solid #e2229f;
  border-radius: 6px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s ease;
}

select:focus {
  border-color: #c01883;
}

button {
  background-color: #e2229f;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s ease;
  width: 40%;
  margin-left: 30%;
}

button:hover {
  background-color: #c01883;
}

.horarios-disponiveis h2 {
  text-align: center;
  margin-bottom: 20px;
}

.table-wrapper {
  overflow-x: auto;
}

.horarios-tabela {
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.horarios-tabela th,
.horarios-tabela td {
  padding: 15px 10px;
  border: 1px solid #ddd;
  text-align: center;
}

.horarios-tabela th {
  background-color: #e2229f;
  color: white;
  font-weight: bold;
}

.horarios-tabela td {
  background-color: #f9f9f9;
  vertical-align: top;
}

.horario-lista {
  list-style: none;
  padding: 0;
  margin: 0;

}

.horario-lista li {
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
 
}

.horario-lista button {
  background-color: transparent;
  color: #e2229f;
  border: none;
  cursor: pointer;
  font-size: 16px;
  
  margin-left: -10%;
}

.horario-lista button:hover {
  color: #000000;
}

</style>
