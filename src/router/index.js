import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import AvisosPage from '../components/AvisosPage.vue'; // Importar a nova rota
import DashboardPage from '../components/DashboardPage.vue';
import AgendamentoPage from '../components/AgendamentoPage.vue';
import LoginPage from '@/components/LoginPage.vue';
import FormHora from '@/components/FormHora.vue';
import CadastroUserPage from '@/components/CadastrouserPage.vue';
import TelaInformacoes from '@/components/TelaInformacoes.vue';

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
  },
  {
    path: '/cadastro',
    name: 'CadastroUserPage',
    component: CadastroUserPage
  },

  {
    path: '/administracao',
    name: 'DashboardPage',
    component: DashboardPage,
  },
  {
    path: '/agendamento',
    name: 'AgendamentoPage',
    component: AgendamentoPage,
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage,
  },
  {
    path: '/formhorario',
    name: 'formhora',
    component: FormHora,
  },
  {
    path: '/avisos',
    name: 'Avisos',
    component: AvisosPage // Adicionar a nova rota
  },
  {
    path: '/informacoes',
    name: 'TelaInformacoes',
    component: TelaInformacoes
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;