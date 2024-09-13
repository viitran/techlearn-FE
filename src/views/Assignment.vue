<template>
    <div class="container">
        <div class="assignment-wrapper row col-12 h-100">
            <div class="body col-12 ">
                <div class="assignment-header">
                    <h1 class="assignment-title h2">{{ courseData.courseName }}</h1>
                    <div class="assignment-search">
                        <div class="search-bar w-100">
                            <div class="search-icon-wrapper">
                                <i class="search-icon fa-solid fa-magnifying-glass"></i>
                            </div>
                            <input type="text" class="search-input" placeholder="Tìm kiếm..." v-model="searchQuery"
                                @input="fetchFilteredData" />
                        </div>
                        <div class="d-none d-lg-flex align-items-center ml-2"></div>
                        <select class="filter filter-btn form-select" v-model="selectedFilter"
                            @change="fetchFilteredData">
                            <option value="all">Tất cả</option>
                            <option value="unSubmit">Chưa nộp</option>
                            <option value="submitted">Đã nộp</option>
                        </select>
                        <button class="search-btn btn btn-primary ml-2" @click="fetchFilteredData">Tìm kiếm</button>
                    </div>
                    <button class="search-btn btn btn-primary d-lg-none ml-2" @click="fetchFilteredData">Tìm
                        kiếm</button>
                </div>
            </div>
            <div class="separate"></div>
            <div class="content-header">
                <h3 class="content-title">Nội dung khóa học</h3>
                <p class="courseData-time">{{ filteredChapters.length }} chương • {{ totalLessons }} bài giảng •
                    Tổng thời lượng: {{ courseData.time }}</p>
            </div>
            <div class="content-body mt-3">
                <div id="accordion">
                    <div class="card body-wrapper list-chapter" v-for="(chapter, index) in filteredChapters"
                        :key="index">
                        <div class="card-header" :id="'heading' + index">
                            <h5 class="mb-0">
                                <button class="btn chapter-title" type="button" data-toggle="collapse"
                                    :data-target="'#collapse' + index" :aria-controls="'collapse' + index">
                                    <i class="fa-solid fa-angle-down"></i>
                                    Chapter {{ index + 1 }}: {{ chapter.name }}
                                </button>
                            </h5>
                        </div>
                        <div :id="'collapse' + index" :class="index === 0 ? 'collapse show' : 'collapse'"
                            :aria-labelledby="'heading' + index">
                            <div class="card-body assignment-card" v-for="(item, itemIndex) in chapter.assignments"
                                :key="itemIndex">
                                <div class="assignment">
                                    <i class="fa-solid fa-book"></i>
                                    <p class="ml-2 assignment-title">#{{ itemIndex + 1 }} {{ item.name }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const courseData = ref({});
const filteredChapters = ref([]);
const searchQuery = ref('');
const selectedFilter = ref('all');
const totalLessons = ref(0);

const fetchCourseData = async () => {
    const courseId = route.params.id;
    try {
        const response = await axios.get(`/api/v1/chapters/${courseId}`);
        courseData.value = response.data;

        filteredChapters.value = courseData.value.chapters;
        totalLessons.value = calculateTotalLessons(courseData.value.chapters);
    } catch (error) {
        console.error("Error when fetching courses: ", error);
    }
};

const calculateTotalLessons = (chapters) => {
    return chapters ? chapters.reduce((sum, chapter) => sum + chapter.assignments.length, 0) : 0;
};

const fetchFilteredData = async () => {
    const courseId = route.params.id;
    try {
        const response = await axios.get(`/api/v1/chapters/${courseId}`, {
            params: {
                search: searchQuery.value,
                filter: selectedFilter.value
            }
        });
        const data = response.data;
        filteredChapters.value = data.chapters;
        totalLessons.value = calculateTotalLessons(data.chapters);
    } catch (error) {
        console.error("Error when fetching data (filter):", error);
    }
};

onMounted(fetchCourseData);
</script>

</script>

<style>
p {
    margin: 0 !important;
}

.assignment-wrapper {
    padding: 60px 0;
}

.assignment-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.assignment-search {
    display: flex;
}

.search-bar {
    display: flex;
    align-items: center;
    width: 300px;
}

.search-icon-wrapper {
    height: 37.6px;
    line-height: 40px;
    border: 1px solid #e2e2e2;
    border-top-left-radius: 0.375rem;
    border-bottom-left-radius: 0.375rem;
    border-right: 0;
}

.search-icon {
    font-size: 22px;
    padding: 0 10px;
}

.search-input {
    border: 1px solid #e2e2e2;
    border-radius: 0.375rem;
    width: 100%;
    padding: 6px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-left: 0;
}

.search-input:focus {
    outline: none
}

.filter {
    width: 110px !important;
}

.filter-btn {
    color: #333 !important;
    background-color: #fff !important;
    border: 1px solid #e9e9e9 !important;
}

.body {
    height: 100%;
}

.courseData-intro {
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

.courseData-time {
    font-size: 16px;
}

.content-body {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.assignment-card:hover {
    background-color: #eee;
    text-decoration: underline;
}

.assignment {
    display: flex;
    align-items: center;
    height: 30px;
    padding-left: 12px;
    cursor: pointer;
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

button.btn.chapter-title.collapsed:active {
    border: none;
}

button.btn.chapter-title.collapsed {
    border: none;
}
</style>
