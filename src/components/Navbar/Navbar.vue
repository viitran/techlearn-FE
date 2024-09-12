<template>
    <div class="wrapper">
        <nav id="sidebar" :class="{ 'active': isSidebarCollapsed }">
            <div class="sidebar-header">
                <h3>Teachlearn</h3>
            </div>
            <ul class="list-unstyled components">
                <li class="active">
                    <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">Home</a>
                    <ul class="collapse list-unstyled" id="homeSubmenu">
                        <li><a href="#">Home 1</a></li>
                        <li><a href="#">Home 2</a></li>
                        <li><a href="#">Home 3</a></li>
                    </ul>
                </li>
                <li>
                    <a href="#">About</a>
                    <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">Pages</a>
                    <ul class="collapse list-unstyled" id="pageSubmenu">
                        <li><a href="#">Page 1</a></li>
                        <li><a href="#">Page 2</a></li>
                        <li><a href="#">Page 3</a></li>
                    </ul>
                </li>
                <li><a href="#">Portfolio</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
        </nav>
    </div>
</template>

<script setup>
import { inject } from 'vue';

const isSidebarCollapsed = inject('isSidebarCollapsed');
</script>

<style scoped>
.wrapper {
    display: flex;
    align-items: stretch;
}

#sidebar {
    min-width: 220px;
    max-width: 220px;
    background: #7386D5;
    color: #fff;
    transition: all 0.3s;
}

#sidebar a,
#sidebar a:hover,
#sidebar a:focus {
    color: inherit;
    text-decoration: none;
}

#sidebar .sidebar-header {
    padding: 20px;
    background: #6d7fcc;
}

#sidebar ul.components {
    padding: 20px 0;
}

#sidebar ul li a {
    padding: 10px 20px;
    font-size: 1.1em;
    display: block;
}

#sidebar ul ul li a {
    padding: 10px 30px;
    font-size: 1em;
    display: block;
}

#sidebar ul li a:hover {
    background: #6d7fcc;
}

#sidebar ul li.active>a,
a[aria-expanded="true"] {
    background: #6d7fcc;
}

#sidebar.active {
    margin-left: -220px;
}

@media (max-width: 768px) {
    #sidebar {
        margin-left: -220px;
    }

    #sidebar.active {
        margin-left: 0;
    }
}
</style>
