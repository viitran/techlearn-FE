<template>
  <div class="container w-100 my-5 h-100">
    <h3>CẤU HÌNH FROM REVIEW BÀI TẬP</h3>
    <hr />
    <h5>Cấu trúc prompt</h5>
    <div class="mb-3">
      <textarea
        class="form-control shadow"
        id="exampleFormControlTextarea1"
        rows="10"
        v-model="promptAI.contentPrompt"
      >
      </textarea>
    </div>
    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
      <button
        class="btn btn-primary me-md-2"
        @click="submitPrompt"
        type="button"
      >
        Submit
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { toast } from "vue3-toastify";
import * as yup from "yup";
export default {
  async mounted() {
    try {
      const response = await axios.get(this.mockApi);

      if (response.status == 200) {
        this.promptAI.contentPrompt = response.data.contentPrompt;
      } else {
        toast.error("Update Failed !");
      }
    } catch (error) {
      toast.error("An error occurred while fill prompt!");
    }
  },
  data() {
    return {
      mockApi: "http://localhost:3000/prompt",
      rootApi: process.env.VUE_APP_ROOT_API,
      promptAI: {
        contentPrompt: `Bây giờ tôi sẽ gửi cho bạn link github, tôi muốn bạn review bài tập ở link github đó.     
Đây là link github của tôi: {{githubLink}} 
Kết quả review được trả lời bằng tiếng Việt.     
Cấu trúc review sẽ gồm:
Nhận xét chi tiết
Đánh giá tổng quan
Kết quả (chỉ trả lời pass/fail) `,
      },
    };
  },

  methods: {
    async submitPrompt() {
      try {
        const response = await axios.put(this.mockApi, this.promptAI);
        console.log(response.data);
        if (response.status === 200) {
          toast.success("Update  Success !", {
            autoClose: 2000,
          });
        } else {
          toast.error("Update Failed !");
        }
      } catch (error) {
        toast.error("An error occurred while update prompt!");
        console.log(error);
      }
    },
  },
};
</script>
