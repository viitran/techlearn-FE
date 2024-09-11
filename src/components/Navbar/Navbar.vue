<template>
  <div class="navbar-container">
    <div class="list-item">
      <div
        class="item"
        @click="handleSelect(5)"
        :class="{ active: selectedItem === 5 }"
      >
        <router-link to="configPrompt">Config Promp chấm điểm </router-link>
      </div>
      <div
        class="item"
        @click="handleSelect(6)"
        :class="{ active: selectedItem === 6 }"
      >
        <router-link to="/submitAssignment">Khóa học của tôi </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const selectedItem = ref(0);

const handleSelect = (e) => {
  selectedItem.value = e;
};
</script>

<style scoped>
.navbar-container {
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
/* .list-item{ */
/* padding: 5px; */
/* } */
.item {
  padding: 10px;
  cursor: pointer;
  margin: 20px 5px;
  display: flex;
  border-bottom: 1px solid #ddd;
}

.active {
  background-color: #eee;
  font-weight: bold;
  border-radius: 5px;
}

.item a {
  text-decoration: none;
  color: black;
  font-size: 15px;
}
</style>
