<template>
  <div class="container">
    <div class="assignment-container" v-if="assignmentDescription">
      <div class="title-container">
        <p>{{ assignmentDescription.tenBaiTap }}</p>
        <button @click="viewSolution">Xem solution</button>
      </div>
      <div class="assignment-description">
        <div class="description-text" v-html="assignmentDescription.moTa"></div>
      </div>
    </div>
    <div v-else>
      <p>Đang tải dữ liệu...</p>
    </div>
    <div class="submit-container">
      <p>Nộp bài tập:</p>
      <div class="input-container">
        <input
          type="text"
          placeholder="Thêm link github tại đây"
          v-model="githubLink"
        />
        <button @click="submitAssignment" :disabled="isLoading">
          <span v-if="isLoading">
            <div class="spinner"></div>
          </span>
          <span v-else>Submit</span>
        </button>
      </div>
    </div>
    <div class="result-container">
      <p>Kết quả:</p>

      <div
        class="result-AI-container"
        v-for="(res, index) in result"
        :key="index"
      >
        <p>Lần submit thứ {{ index + 1 }}:</p>
        <div class="response-AI-text" v-html="formatResult(res)"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";

const courseId = "1";
const chapterId = 1;
const exerciseId = 1;

const assignmentDescription = ref(null);
const githubLink = ref("");
const result = ref([]);
const isLoading = ref(false);
const rootApi = process.env.VUE_APP_ROOT_API;

const fetchReview = async () => {
  try {
    const response = await axios.get(`${rootApi}/api/v1/reviews`);
    response.data.result.items.map((review, index) => {
      result.value.push(review.content);
    });
    console.log(result.value);
  } catch (error) {
    console.log(error);
  }
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

const viewSolution = () => {
  console.log("Solution clicked");
};

const submitAssignment = async () => {
  try {
    isLoading.value = true;
    console.log(githubLink.value);
    const response = await axios.post(
      `${rootApi}/api/v1/reviews/fetch-repo-content`,
      {
        github_link: githubLink.value,
      }
    );
    // const data = JSON.parse(response.data.result);
    const data = response.data;
    // console.log(response.data.result);
    result.value.push(data.result);
    isLoading.value = false;
  } catch (error) {
    console.log(error);
  }
};

const formatResult = (result) => {
  // const str = JSON.parse(result);
  return result.replace(/\\n/g, "<br>");
};

onMounted(async () => {
  await fetchAssignments();
  await fetchReview();
});
</script>

<style scoped>
.container {
  margin: 30px;
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
.response-AI-text {
  border: 1px solid #d3bfbf;
  border-radius: 10px;
  padding: 13px;
  margin-left: 12px;
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
