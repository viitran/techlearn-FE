<template>
  <div class="container">
    <div class="assignment-wrapper row col-12 h-100" v-if="courseData">
      <div class="body col-12"></div>

      <!-- Tabs -->
      <div class="content-schedule-tabs shadow">
        <div class="tab-button mr-1" :class="{ active: activeTab === 'content' }" @click="activeTab = 'content'">
          Nội dung
        </div>
        <div class="tab-button" :class="{ active: activeTab === 'schedule' }" @click="activeTab = 'schedule'">
          Đặt lịch hỗ trợ
        </div>
      </div>

      <!-- Nội dung khóa học -->
      <div v-if="activeTab === 'content'">
        <div class="content-header">
          <h3 class="content-title">Nội dung khóa học</h3>
          <p class="courseData-time">
            {{ filteredChapters.length }} chương • {{ totalLessons }} bài giảng •
            Tổng thời lượng: {{ courseData.time }}
          </p>
        </div>
        <div class="content-body mt-3">
          <div id="accordion">
            <div class="card body-wrapper list-chapter" v-for="(chapter, index) in filteredChapters" :key="index">
              <div class="card-header" :id="'heading' + index">
                <h5 class="mb-0">
                  <button class="btn chapter-title" type="button" data-toggle="collapse"
                    :data-target="'#collapse' + index" :aria-controls="'collapse' + index">
                    <i class="fas fa-angle-down"></i>&nbsp;
                    <strong> {{ index + 1 }}.</strong> {{ chapter.name }}
                  </button>
                </h5>
              </div>
              <div :id="'collapse' + index" :class="index === 0 ? 'collapse show' : 'collapse'"
                :aria-labelledby="'heading' + index">
                <div v-for="(item, itemIndex) in assignments" :key="itemIndex">
                  <div class="card-body assignment-card" v-if="Number(item?.chapter) === Number(chapter?.id)" @click="
                    router.push({
                      name: 'submitAssignment',
                      params: { id: item.id },
                      query: { userID: userId },
                    })
                    ">
                    <div class="assignment">
                      <i class="fa fa-book"></i>
                      <p class="ml-2 assignment-title">
                        {{ item.title }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Đặt lịch  -->
      <div v-if="activeTab === 'schedule'">
        <h3 class="content-title">Đặt lịch hỗ trợ</h3>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();
const rootApi = process.env.VUE_APP_ROOT_API;
const route = useRoute();
const courseData = ref();
const filteredChapters = ref([]);
const totalLessons = ref(0);
const course = ref([]);

const activeTab = ref("content");
const userId = route.query.userID;
const courseId = route.params.id;
const assignments = ref();

const fetchCourses = async () => {
  const response = await axios.get(`${rootApi}/courses/${courseId}`);
  course.value = response.data.result.data;
};

const fetchCourseData = async () => {
  try {
    const response = await axios.get(
      `${rootApi}/chapters?idCourse=${courseId}`
    );
    courseData.value = response.data.result.items.data;
    filteredChapters.value = courseData.value;
    totalLessons.value = calculateTotalLessons(courseData.value);
  } catch (error) {
    console.error("Error when fetching courses: ", error);
  }
};

const fetchAssignment = async () => {
  try {
    const response = await axios.get(
      `${rootApi}/assignments`
    );
    assignments.value = response.data.result.items.data;
  } catch (error) { }
};

const calculateTotalLessons = (chapters) => {
  return chapters ? chapters.length : 0;
};

onMounted(async () => {
  await fetchCourses();
  await fetchCourseData();
  await fetchAssignment();
});
</script>

<style>
p {
  margin: 0 !important;
}

.body {
  height: 100%;
}

.assignment-wrapper {
  padding: 20px 0;
  justify-content: center;
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
  outline: none;
}

.filter {
  width: 150px !important;
}

.filter-btn {
  color: #333 !important;
  background-color: #fff !important;
  border: 1px solid #e9e9e9 !important;
}

.content-schedule-tabs {
  display: flex;
  width: 50% !important;
  background: #fff;
  border-radius: 30px;
  align-items: center;
  font-size: 18px;
  font-weight: 600;
  padding: 5px;
}

.tab-button {
  width: 50%;
  padding-left: 15px;
  text-align: center;
  border-radius: 20px;
  background-color: #f3f3f3;
  padding: 5px;
  cursor: pointer;
}

.content-schedule-tabs .active {
  background-color: #0d6efd;
  color: #fff;
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

/* .content-body {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
} */

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
