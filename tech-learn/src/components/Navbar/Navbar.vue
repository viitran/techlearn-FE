<template>
  <div class="navbar-container">
    <div class="list-item">
        <div class="item" @click="handleSelect(1)" :class="{active: selectedItem === 1}">
            <router-link to="">Đặt Lịch support</router-link>
        </div>
        <div class="item" @click="handleSelect(2)" :class="{active: selectedItem === 2}">
            <router-link to="">Xem Lịch Giảng Viên</router-link>
        </div>
        <div class="item" @click="handleSelect(3)" :class="{active: selectedItem === 3}">
            <router-link to="">Quản Lý Tài khoản Học Viên</router-link>
        </div>
        <div class="item" @click="handleSelect(4)" :class="{active: selectedItem === 4}">
            <router-link to="">Quản Lý Tài khoản Giảng Viên</router-link>
        </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';


const selectedItem = ref(0);

const handleSelect = (e) => {
    selectedItem.value = e

}
</script>

<style scoped>
.navbar-container {
    display: flex;
    flex-direction: column;
    border-radius: 5px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.list-item{
    /* padding: 5px; */
}
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