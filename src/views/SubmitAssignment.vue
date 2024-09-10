<template>
  <div class="container">
    <div class="assignment-container" v-if="assignmentDescription">
      <div class="title-container">
        <p>{{ assignmentDescription.exerciseName }}</p>
        <button @click="viewSolution">Xem solution</button>
      </div>
      <div class="assignment-description">
        <pre>{{ assignmentDescription.description }}</pre>
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
        <button @click="submitAssignment">Submit</button>
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
        <textarea
          ref='"resultTextarea"+ index'
          readonly
          v-model="result[index]"
          @input="adjustHeight"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted, watch } from "vue";

const courseId = "1";
const chapterId = 1;
const exerciseId = 1;

const assignmentDescription = ref(null);
const githubLink = ref("");
const result = ref([
  `
Nhận xét Chi tiết:
    Nhập Dữ Liệu:
        Chương trình sử dụng đối tượng Scanner để nhận dữ liệu từ người dùng, điều này là đúng.
    Xử Lý Dữ Liệu:
        Phần mã xử lý điều kiện trong câu lệnh if-else không chính xác. Trong mã hiện tại, có hai điều kiện if kiểm tra số âm (number < 0). Điều này dẫn đến việc không bao giờ thực hiện điều kiện thứ hai là số dương. Đặc biệt, không có điều kiện nào kiểm tra số dương.
    Câu Lệnh if-else:
        Điều kiện kiểm tra số âm (number < 0) được lặp lại hai lần.
        Điều kiện kiểm tra số dương và số không chưa được xử lý đúng cách.
        Câu lệnh else cuối cùng sẽ chỉ được thực hiện nếu số là 0, điều này là đúng nhưng có thể không đạt yêu cầu nếu các điều kiện không được kiểm tra đúng cách trước đó.
    Đóng Đối Tượng Scanner:
        Chương trình đóng đối tượng Scanner sau khi sử dụng, điều này là đúng và giúp giải phóng tài nguyên.
Đánh Giá Tổng Quan:
    Sự Chính Xác:
        Chương trình không chính xác vì điều kiện kiểm tra số âm được lặp lại và không có điều kiện kiểm tra số dương.
    Hiệu Quả:
        Mặc dù chương trình thực hiện bước nhập dữ liệu và xử lý điều kiện cơ bản, nhưng điều kiện kiểm tra chưa được triển khai chính xác.
    Độ Sáng Sủa:
    Mã nguồn dễ đọc và dễ hiểu, nhưng có lỗi logic làm ảnh hưởng đến kết quả.
Kết Quả: Fail
`,
  `
Nhận xét chi tiết
  Nhập dữ liệu từ người dùng:
    Bạn sử dụng đối tượng Scanner để nhận dữ liệu từ người dùng, điều này là hoàn toàn chính xác và hợp lý trong trường hợp này.
  Yêu cầu nhập số nguyên:
    Bạn đã sử dụng System.out.print để yêu cầu người dùng nhập số nguyên, giúp chương trình dễ hiểu và dễ sử dụng.
  Kiểm tra số nhập vào:
    Câu lệnh if-else được sử dụng đúng để kiểm tra ba điều kiện (số dương, số âm, số không). Đây là cách tiếp cận chuẩn cho bài toán này.
  In kết quả:
    Bạn đã in đúng các thông báo cho từng điều kiện. Thông báo phù hợp với yêu cầu đề bài.
  Đóng đối tượng Scanner:
    Việc đóng đối tượng Scanner bằng scanner.close() là một thực hành tốt để giải phóng tài nguyên.
Đánh giá tổng quan
  Chức năng: Chương trình thực hiện đúng các yêu cầu đề bài.
  Đọc hiểu mã nguồn: Mã nguồn dễ đọc, dễ hiểu và không có lỗi cú pháp hay lỗi logic.
  Hiệu quả: Chương trình hoạt động hiệu quả với các điều kiện được nêu.
Kết quả: Pass
`,
]);

const fetchAssignments = async () => {
  try {
    const response = await axios.get("http://localhost:3000/courses");
    const data = response.data;
    // console.log(data.courses);
    const course = data.find((course) => course.id === courseId);
    if (course) {
      const chapter = course.chapters.find(
        (chapter) => chapter.id === chapterId
      );
      if (chapter) {
        const exercise = chapter.exercises.find(
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

const submitAssignment = () => {
  console.log("GitHub link submitted:", githubLink.value);
};

const adjustHeight = () => {
  const textareas = Array.from(document.querySelectorAll("textarea"));
  textareas.forEach((textarea) => {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  });
};

onMounted(async () => {
  await fetchAssignments();
  adjustHeight();
});

watch(result, () => {
  adjustHeight();
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

.assignment-description pre {
  font-size: 16px;
  margin-left: 12px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
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
</style>
