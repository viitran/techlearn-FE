<template>
  <div class="wrapper">
    <div class="d-flex" v-if="!isLoginPage">
      <Sidebar />
      <div class="flex-grow-1">
        <Header />
        <div class="content p-4">
          <RouterView />
        </div>
        <!-- <Footer /> -->
      </div>
    </div>
    <div v-else>
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import Header from './components/Header/Header.vue';
import Sidebar from './components/Navbar/Navbar.vue';
import Footer from './components/Footer/Footer.vue';

import { RouterView, useRoute } from 'vue-router';
import { ref, provide, computed, onMounted } from 'vue';
import router from './router';

const isSidebarCollapsed = ref(false);

const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value;
};

provide('isSidebarCollapsed', isSidebarCollapsed);
provide('toggleSidebar', toggleSidebar);

const route = useRoute();
const isLoginPage = computed(() => route.path === "/login");

const isLogin = localStorage.getItem("accessToken");
const isSuppoter = localStorage.getItem("isSuppoter");
onMounted(() => {
  if (isLogin === null) {
    router.push("/login");
  }
  if (!isSuppoter && window.location.href.includes("/teacher")) {
    router.push("/404")
  }
});
</script>

<style scoped>
.wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: row;
}

.d-flex {
  display: flex;
  flex-grow: 1;
  flex-direction: row;
}

.content {
  flex-grow: 1;
  background-color: #f8f9fa;
}

.sidebar {
  width: 250px;
  min-width: 250px;
}

@media (max-width: 768px) {
  .content {
    margin-left: 0;
  }

  .sidebar {
    width: 100%;
    position: absolute;
    z-index: 1;
  }
}
</style>
