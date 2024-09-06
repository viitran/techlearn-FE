<template>
  <header class="header-container">
    <div class="header-maxwidth">
        <div class="div-right">
            <img alt="Logo" src="https://www.dongdu.studyarts.vn/static/images/logo-jp.png"/>
            <div class="header-search">
                <input class="input-search" placeholder="Nhập Từ Khóa"/>
                <div>
                    <span>Tìm kiếm</span>
                </div>
            </div>
        </div>
        <div class="div-left">
            <div>
                <router-link to="">
                <span>
                        Đăng nhập
                    </span>
                    <fa icon="right-to-bracket"/>
                </router-link>
            </div>
        </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';


</script>

<style scoped>
.header-container {
    background-color: #1d44f2;
    width: 100%;
    height: 50px;
}

.header-maxwidth {
    width: 60%;
    margin: 0 auto;
    display: flex;
    height: 50px;
}

.div-right {
    display: flex;
    width: 50%;
    justify-content: space-between;
    padding: 5px 0;
}


.header-search {
    display: flex;
    min-width: 80%;
}
.input-search {
    height: 38px;
    border: none;
    border-radius: 20px 0 0 20px;
    width: 65%;
    padding-left: 15px;
    outline: none;
}

.header-search div {
    border-radius: 0 20px 20px 0;
    color: #fff;
    background-color: #66bad6;
    width: 30%;
    height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.div-left {
    width: 50%;
    display: flex;
    justify-content: end;
    align-items: center;
    color: #fff;
}

.div-left div a {
    text-decoration: none;
    color: #fff;
}

</style>