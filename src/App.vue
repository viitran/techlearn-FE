<template>
  <div class="home-page">
    <Header class="header"></Header>
    <Navbar class="navbar"></Navbar>
    <div class="content">
      <RouterView />
    </div>
  </div>
  <Footer class="footer"></Footer>
</template>
<script setup>
import Header from './components/Header/Header.vue';
import Navbar from './components/Navbar/Navbar.vue';
import 'vue3-toastify/dist/index.css';
import { RouterView } from 'vue-router';
import Footer from './components/Footer/Footer.vue';
import '@fortawesome/fontawesome-free/css/all.min.css';
</script>
<style>
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2C3E50;
}

.home-page {
  display: grid;
  grid-template-areas:
    "header header header header"
    "navbar content content content"
    "navbar content content content"
    ". footer footer footer";
  grid-template-columns: 250px 1fr 1fr 1fr;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

.header {
  grid-area: header;
}

.navbar {
  grid-area: navbar;
}

.content {
  grid-area: content;
  margin: 10px 20px;
  width: calc(100% - 40px);
}

.footer {
  grid-area: footer;
  padding: 20px;
  background-color: #f8f9fa;
  text-align: center;
}
</style>
