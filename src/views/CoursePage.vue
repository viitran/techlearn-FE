<template>
  <div class="container">
    <p class="title">Khóa học của tôi</p>
    <div class="card-container">
      <div
        v-for="(course, index) in courses"
        :key="index"
        class="card shadow"
        style="width: 18rem"
      >
        <img :src="course.image" class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">{{ course.courseName }}</h5>
          <p class="quantity-exercise">
            {{
              course.chapters.reduce((total, chapter) => {
                return total + chapter.exercises.length;
              }, 0)
            }}
            Bài tập
          </p>
          <p class="card-text">
            {{ course.description }}
          </p>
        </div>
        <div class="c-footer py-3">
          <img :src="avatar" alt="" />
          <p class="my-auto">Nguyễn Tuấn</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import { onMounted } from "vue";
import avatar from "../../public/avatar.jpg";

const courses = ref([]);

const fetchCourses = async () => {
  const response = await axios.get("http://localhost:3000/courses");
  courses.value = response.data;
};

onMounted(async () => {
  await fetchCourses();
});
</script>

<style scoped>
.card-container {
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 15px;
}

.card-container img {
  width: 100%;
  height: 150px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}

.title {
  margin-top: 8px;
  font-weight: 650;
  font-size: 24px;
}
.card-title {
  font-weight: 580;
}
.card {
  cursor: pointer;
  border-radius: 15px;
}
.quantity-exercise {
  font-size: 14px;
  color: rgb(175, 154, 154);
}
.card-text {
  font-weight: 400;
  font-size: 14px;
  color: rgb(120, 88, 88);
}
.c-footer {
  display: flex;
  gap: 10px;
  justify-content: flex-start;
  margin-left: 15px;
  align-items: center;
}

.c-footer img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
</style>
