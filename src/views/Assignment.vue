<template>
    <div class="container">
        <div class="assignment-wrapper row col-12 h-100">
            <div class="body col-9">
                <h1>{{ courses.tenKhoaHoc }}</h1>
                <div class="separate"></div>
                <div class="content-header">
                    <h3 class="content-title">Nội dung khóa học</h3>
                    <p class="course-time">{{ totalChapters }} chương • {{ totalLessons }}  bài giảng • Tổng thời lượng:
                        {{
                            courses.thoiGian }} </p>
                </div>
                <div class="content-body mt-3">
                    <div id="accordion">
                        <div class="card body-wrapper list-chapter" v-for="(chuong, index) in courses.chuong"
                            :key="index">
                            <div class="card-header" id="headingOne">
                                <h5 class="mb-0">
                                    <button class="btn chapter-title" data-toggle="collapse"
                                        :data-target="'#collapse' + index" :aria-controls="'collapse' + index">
                                        <i class="fa-solid fa-angle-down"></i>
                                        Chapter {{ index + ": " + chuong.tenChuong }}
                                    </button>
                                </h5>
                            </div>
                            <div :id="'collapse' + index" :class="index === 0 ? 'collapse show' : 'collapse'"
                                :aria-labelledby="'heading' + index">
                                <div class="card-body" v-for="(item, index) in chuong.baiTap" :key="index">
                                    <div class="assignment">
                                        <i class="fa-solid fa-book"></i>
                                        <p class="ml-2 assignment-title">#{{ index + " " + item.tenBaiTap }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="sidebar col-3 d-none d-md-flex">
                <div class="avatar">
                    <img class="teacher-img"
                        src="https://ps.w.org/user-avatar-reloaded/assets/icon-128x128.png?rev=2540745" />
                </div>
                <p class="teacher-name">
                    Chinh le
                </p>
                <div class="student-info">
                    <i class="fa-solid fa-user student-icon"></i>
                    <p class="student-count m-0">100 học viên</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

import axios from 'axios';
import { ref } from "vue";
import { onMounted } from "vue";

const courses = ref([]);
const totalChapters = ref([]);
const totalLessons = ref([]);

const fetchCourses = async () => {
    const response = await axios.get("/dataNhom1.json");
    console.log("test", response.data.khoahoc[0]);
    courses.value = response.data.khoahoc[0];
    totalChapters.value = courses.value.chuong.length;
    totalLessons.value = courses.value.chuong.reduce((acc, chuong) => {
        return acc + chuong.baiTap.length;
    }, 0);
    console.log("totalChapters", totalLessons.value);
};

onMounted(async () => {
    await fetchCourses();
});

</script>

<style>
p {
    margin: 0 !important;
}

.assignment-wrapper {
    padding: 60px 0;
}

.sidebar {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
}

.teacher-img {
    border-radius: 50%;
    width: 200px;
    height: 200px;
}

.teacher-name {
    margin: 10px 0 0;
    font-size: 18px;
}

.student-info {
    display: flex;
    align-items: center;
}

.student-icon {
    width: 20px;
    height: 20px;
    padding-right: 2px;
    line-height: 20px;
}

.student-count {
    font-size: 20px;
}

.body {
    height: 100%;
}

.course-intro {
    margin-top: 30px;
    padding: 20px;
    border: solid 2px;
}

.list-intro.row.col-12 {
    margin: 0;
}

.item {
    display: flex;
    align-items: center;
    padding: 10px 10px 0;
}

.separate {
    margin-top: 30px;
    border: 1px dashed rgb(223, 223, 223);
}

.content-title {
    margin-top: 30px;
}

.course-time {
    font-size: 16px;
}

.content-body {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.assignment {
    display: flex;
    align-items: center;
    height: 30px;
    padding-left: 12px;
}

.body-wrapper {
    border-radius: 0;
}

.card.body-wrapper.list-chapter {
    border-radius: 0;
}


.chapter-title:focus {
    box-shadow: none;
    border: none;
}

.assignment-title {
    font-size: 16px;
    line-height: 30px;
}
</style>