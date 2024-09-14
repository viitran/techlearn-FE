<template>
    <header>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <button @click="toggleSidebar" type="button" id="sidebarCollapse" class="btn btn-info">
                    <i class="fas fa-align-left text-white"></i>
                </button>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav ml-auto align-items-center">
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <img src="https://i.pinimg.com/564x/0b/2b/52/0b2b527a5d4ad76e7ee6115e895afac2.jpg"
                                    class="rounded-circle avatar" alt="User Avatar">
                            </a>
                            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                                <a class="dropdown-item" href="#">Profile</a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="#">Logout</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
</template>

<script setup>
import { inject } from 'vue';

const toggleSidebar = inject('toggleSidebar');
</script>

<style scoped>
.navbar {
    padding: 15px 10px;
    background: #fff;
    border: none;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
}

.navbar-btn {
    box-shadow: none;
    outline: none !important;
    border: none;
}

.avatar {
    width: 40px;
    height: 40px;
}

.nav-item .dropdown-menu {
    min-width: 150px;
}

.dropdown-item {
    cursor: pointer;
}
</style>
