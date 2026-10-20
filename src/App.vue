<template>
  <div id="app">
    <header class="header">
      <div class="hamburger-menu" @click="toggleMenu">
        &#9776;
      </div>
      <div class="logo-container">
    <img alt="Vue logo" src="./assets/logo4.png" class="logo" @click="navigateToHome">
    <img alt="Vue img" src="./assets/nomeEmporiodivas.png" class="logo-nome">
  </div>
    </header>

    <div v-if="menuOpen" class="side-menu">
      <router-link to="/login" @click="toggleMenu">Administração</router-link>
      <router-link to="/cadastro" @click="toggleMenu">Cadastro</router-link>
    </div>
    <router-view></router-view>
    
    <footer class="footer">
      <div class="footer-content">
        <p>© 2025 <strong>Emporio das Divas</strong> | Criado e desenvolvido por <strong>LanaSantos</strong>. Todos os direitos reservados.</p>

      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      menuOpen: false
    };
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    navigateToHome() {
      this.$router.push('/');
    },
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
}

.logo-container {
  display: flex;
  flex-direction: column;
  align-items: center; 
  margin-top: 50px;
}

.logo {
  width: 200px;
  cursor: pointer;
}

.logo-nome {
  width: 70%;
  margin-top: -100px;
}


nav {
  margin-right: 20px;
}

.admin-link {
  color: #000000;
  text-decoration: none;
  font-size: 18px;
  border: 1px solid #000000;
  padding: 4px;
  border-radius: 20px;
  background-color: rgb(238, 238, 238);
}

.admin-link:hover {
  text-decoration: underline;
}

.hamburger-menu {
  font-size: 30px;
  cursor: pointer;
  margin-left: 300px;
}

.side-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 200px;
  height: 100%;
  background-color: #333;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.side-menu a {
  color: white;
  text-decoration: none;
  margin: 10px 0;
}

.side-menu a:hover {
  text-decoration: underline;
}

.footer {
  background-color: #ffffff;
  color: rgb(0, 0, 0);
  text-align: center;
  padding: 10px 0;
  margin-top: 36%;
}

.footer-content p {
  margin: 0;
  font-size: 14px;
}
@media (min-width: 768px) {
  .logo-container {
    margin-top: 20px;
  }

  .logo {
    width: 300px;
  }

  .logo-nome {
    width: 30%;
    margin-top: -150px;
  }

  .hamburger-menu {
    margin-left: 70%;
    margin-right: 50px;
  }
  .footer {
  background-color: #ffffff;
  color: rgb(0, 0, 0);
  text-align: center;
  padding: 10px 0;
  margin-top: 70px;

}
}

</style>