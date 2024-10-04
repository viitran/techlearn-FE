<template>
  <div class="container">
    <div class="card-container">
      <div class="card shadow" v-for="(course, index) in courses" :key="index" style="width: 18rem">
        <img :src="course.image" class="card-img-top" alt="..." />
        <div class="card-body" @click="
          router.push({
            name: 'assignment',
            params: { id: course.id },
            query: { userID: userID },
          })
          ">
          <p class="card-name">{{ course.name }}</p>
          <p class="card-total-exercises">{{ course.totalExercises }}</p>
          <p class="card-text">
            {{ course.description }}
          </p>
        </div>
        <div class="c-footer pb-2">
          <img class="avatar" :src="course.teachers[0].avatar" alt="" />
          <p class="my-auto">{{ course.teachers[0].name }}</p>
        </div>
        <div class="d-flex gap-2 justify-content-center pb-3">
          <button type="button" class="btn btn-primary btn-buy" >Mua</button>
          <button type="button" class="btn btn-primary btn-try" >Học Thử</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted, computed } from "vue";
import avatar from "../../public/avatar.jpg";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();

const rootApi = process.env.VUE_APP_ROOT_API;
const courses = ref([]);
const userID = ref(store.getters.user.id);

const sampleTeachers = [
  {
    id: "550e8400-e29b-41d4-a716-446655440000",
    name: "Nguyễn Ngọc Quang",
    color: "#FF5733",
    avatar: "https://th.bing.com/th?id=OIP.saT9t5OzLzOOUIxWQjZiXAHaJh&w=220&h=283&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
    email: "teacher1@example.com",
    teacherCalendars: [],
    courses: []
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    name: "Lê Duy Linh",
    color: "#33FF57",
    avatar: "https://th.bing.com/th/id/OIP.iru-gBK48nlq2bcwxa3orAHaE7?rs=1&pid=ImgDetMain",
    email: "teacher2@example.com",
    teacherCalendars: [],
    courses: []
  },
];

const sampleCourses = [];

for (let i = 1; i <= 5; i++) {
  const course = {
    id: i,
    name: `KỸ THUẬT LẬP TRÌNH NỀN TẢNG VỚI JAVA ${i}`,
    image: `https://s3-alpha-sig.figma.com/img/5da8/716d/a6fdf4ee3dd38cbccbc9e963cdfa9137?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZqPV8eDshGSrxVvwRQkOBZfq2n4JUHMbPge63yYKDlQ5i72P-0ZGFtWYSWN3wzgJ-BWfCqfi1Mpo2-QHJsG5RoTFSUDl5TUGXyAKcWlu98kQWdIAg3cGspUtWk6eEVyaJ065MytQpPuRdW6WP8vW3LZgegb5VPMSslq~BSVgjBEDuoXjl9qf~WzwbQmapBVEOzVYgs1TGEzASRXN9-3A~N2xzx2dr3H8dc6vRFDTR05k-ud4CsjB81syU2EjWBhJfHOzUFzV-zhMnXY0OrCXgMdmg5YH6VxigWmeLsyVq7l0901ySjIcUosLK4aymqP-ZgGKEU~xgPme9XgsPYeWrA__`,
    description: `Khóa học "Kỹ thuật lập trình nền tảng với Java" cung cấp kiến thức đa chiều về Java: từ cài đặt môi trường, cú pháp căn bản đến điều kiện, lặp, phương thức, Debugging, xử lý chuỗi, và mảng đến ArrayList. Nền tảng lý thú để xây dựng ứng dụng Java chất lượng.`,
    time: `${10 + i}:00`,
    points: 10 * i,
    isDeleted: false,
    listChapter: [],
    userEntities: [],
    teachers: [sampleTeachers[i % sampleTeachers.length]],
    totalExercises: 10 + i * 11
  };


  sampleTeachers[i % sampleTeachers.length].courses.push(course);

  sampleCourses.push(course);
}

const fetchCourses = async () => {
  // const response = await axios.get(`${rootApi}/courses?id=${userID.value}`);
  // courses.value = response.data.result.items.data;
  courses.value = sampleCourses;
};

onMounted(async () => {
  await fetchCourses();
});
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
}

.card-container {
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
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
  font-size: 10px;
  font-weight: 300;
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
  border: 2px solid rgba(0, 122, 255, 0.42);
  padding: 2px;
  background-color: white;
}


.avatar {
  object-fit: cover;
}

.card-name {
  font-size: 12px;
  font-weight: 500;
}

.card-total-exercises {
  font-weight: 300;
  font-size: 12px;
  opacity: 50%;
}

.btn-buy, .btn-try {
  width: 115px;
  height: 29px;
  background-color: rgba(0, 122, 255, 0.42);
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  text-align: center;
  color: rgba(0, 0, 0, 1);
  font-size: 12px;
  font-weight: 400;
}

</style>
