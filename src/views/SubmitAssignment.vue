<template>
  <div class="container">
    <!-- Nội dung bài tập -->
    <div class="assignment-container" v-if="assignmentDescription">
      <div class="title-container">
        <p>{{ assignmentDescription.tenBaiTap }}</p>
        <button @click="viewSolution">Xem giải pháp</button>
      </div>
      <div class="assignment-description">
        <div
          ref="description"
          class="description-text"
          v-html="format(assignmentDescription.moTa)"
        ></div>
      </div>
    </div>
    <div v-else>
      <p>Đang tải dữ liệu...</p>
    </div>

    <!-- Form nộp bài tập -->
    <div class="submit-container">
      <p>Nộp bài tập:</p>
      <div class="input-container">
        <input
          type="text"
          placeholder="Thêm link github tại đây"
          v-model="githubLink"
        />
        <button
          @click="submitAssignment"
          :disabled="isLoading || isPassed"
          :class="{ 'button-disabled': isPassed }"
        >
          <span v-if="isLoading">
            <div class="spinner"></div>
          </span>
          <span v-else>Nộp bài</span>
        </button>
      </div>
    </div>

    <!-- Kết quả -->
    <div class="result-container">
      <div class="result-header">
        <p>Kết quả:</p>
        <button @click="openModal">Xem lịch sử nộp bài</button>
      </div>

      <div v-if="lastResult" class="result-AI-container">
        <div class="time-container">
          <p>{{ formatDateString(lastResult.createdDate) }}</p>
        </div>
        <div class="response-AI-text" v-html="format(lastResult.review)"></div>
      </div>
    </div>

    <!-- Modal Bootstrap -->
    <div
      class="modal fade"
      id="historyModal"
      tabindex="-1"
      aria-labelledby="historyModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5
              class="modal-title"
              id="historyModalLabel"
              style="font-weight: 600; font-size: 25px"
            >
              Lịch sử nộp bài
            </h5>
          </div>
          <div class="modal-body">
            <div v-if="result.length > 0">
              <div v-for="(res, index) in result" :key="index">
                <p
                  style="font-size: 18px; font-weight: 550; margin-bottom: 15px"
                >
                  Lần nộp thứ {{ index + 1 }}
                </p>
                <p>{{ formatDateString(res.createdDate) }}</p>
                <div class="response-AI-text" v-html="format(res.review)"></div>
              </div>
            </div>
            <div v-else>
              <p>Chưa có lịch sử nộp bài.</p>
            </div>
          </div>
          <div class="modal-footer"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const courseId = "1";
const chapterId = 1;
const exerciseId = 1;

const assignmentDescription = ref(null);
const githubLink = ref("");
const result = ref([]);
const isLoading = ref(false);
const rootApi = process.env.VUE_APP_ROOT_API;
const description = ref(null);
const lastResult = ref();
const id = ref("d8f6a72f-889c-4f2f-b7b7-f8b9e7b77d4b");
const assignmentId = ref(1);
const isPassed = ref(false);

const openModal = async () => {
  const modal = new bootstrap.Modal(document.getElementById("historyModal"));
  modal.show();

  try {
    const response = await axios.get(
      `${rootApi}/api/v1/reviews?id=${id.value}&assignment=${assignmentId.value}`
    );
    response.data.result.items.map((rev, index) => {
      result.value.push(rev);
    });
    console.log(result.value);
  } catch (error) {}
};

const fetchLastResult = async () => {
  try {
    const response = await axios.get(
      `${rootApi}/api/v1/reviews/${assignmentId.value}?id=${id.value}`
    );
    lastResult.value = response.data.result;
    // console.log(response.data);
    isPassed.value = response.data.result.status === "PASS" ? true : false;
  } catch (error) {}
};

const fetchAssignments = async () => {
  try {
    const response = await axios.get("http://localhost:3000/khoahoc");
    const data = response.data;

    const course = data.find((course) => course.id === courseId);
    if (course) {
      const chapter = course.chuong.find((chapter) => chapter.id === chapterId);
      if (chapter) {
        const exercise = chapter.baiTap.find(
          (exercise) => exercise.id === exerciseId
        );
        if (exercise) {
          assignmentDescription.value = exercise;
        } else {
          console.error("Bài tập không tìm thấy");
        }
      } else {
        console.error("Chương không tìm thấy");
      }
    } else {
      console.error("Khóa học không tìm thấy");
    }
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu:", error);
  }
};

const submitAssignment = async () => {
  try {
    isLoading.value = true;
    console.log(assignmentDescription.value.moTa);
    const response = await axios.post(
      `${rootApi}/api/v1/reviews/fetch-repo-content`,
      {
        github_link: githubLink.value,
        exerciseTitle:
          assignmentDescription.value.tenBaiTap +
          " yêu cầu: " +
          assignmentDescription.value.moTa +
          " ",
      }
    );
    const data = response.data;
    // result.value.push(data.result);
    await fetchLastResult();
    isPassed.value = data.result.status === "PASS" ? true : false;
    isLoading.value = false;
  } catch (error) {
    console.log(error);
  }
};

const format = (result) => {
  return result.replace(/\n/g, "<br>");
};

const formatDateString = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString("vi-VN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  });
};

onMounted(async () => {
  await fetchAssignments();
  await fetchLastResult();
});
</script>

<style scoped>
.container {
  margin: 30px;
}
.button-disabled {
  background-color: #d8bebe !important;
  color: #999999;
  cursor: not-allowed;
  border: 1px solid #d3d3d3;
}

.title-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.title-container p {
  font-size: 30px;
  font-weight: 700;
}

.title-container button {
  padding: 10px;
  border-radius: 8px;
  background-color: #1872db;
  color: white;
  outline: none;
  border: none;
  margin-right: 30px;
}

.description-text {
  font-size: 17px;
  margin-left: 12px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  margin-top: 15px;
  margin-bottom: 20px;
}
.submit-container p,
.result-container p {
  font-weight: 600;
  font-size: 20px;
}
.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.result-header button {
  /* padding: 10px; */
  border-radius: 8px;
  background-color: #1872db;
  color: white;
  outline: none;
  border: none;
  margin-right: 30px;
  height: 40px;
}
.input-container {
  outline: solid 1px #9b9b9b;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  margin-right: 30px;
  margin-left: 15px;
}
.input-container input {
  outline: none;
  border: none;
  flex-grow: 1;
  padding: 8px;
}
.input-container button {
  border: none;
  outline: none;
  background-color: #1872db;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  color: white;
  width: 120px;
}
.result-container p {
  margin-top: 20px;
}

.result-container textarea {
  width: 96%;
  height: auto;
  min-height: 100px;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #9b9b9b;
  resize: none;
  overflow-y: hidden;
  margin-left: 15px;
}
.result-AI-container p {
  font-weight: 600;
  font-size: 16px;
}
.time-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: 25px;
}
.response-AI-text {
  border: 1px solid #d3bfbf;
  border-radius: 10px;
  padding: 13px;
  margin-left: 12px;
  margin-right: 27px;
  margin-bottom: 15px;
}
.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left: 4px solid white;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;
  display: inline-block;
  vertical-align: middle;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
