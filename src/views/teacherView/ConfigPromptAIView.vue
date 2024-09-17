<template>
  <div class="container w-100 my-2 h-100">
    <h3>CẤU HÌNH AI ĐÁNH GIÁ BÀI TẬP</h3>

    <hr />
    <h5>
      Cấu trúc
      <span class="text-secondary" v-if="promptAI && promptAI.isTemplate">(Template)</span>
    </h5>
    <div class="mb-3">
      <textarea class="form-control shadow" id="exampleFormControlTextarea1" rows="10" v-if="promptAI"
        v-model="promptAI.promptStructure">
      </textarea>
    </div>
    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
      <button class="btn btn-primary me-md-2" @click="() => { $router.push('/listPrompt'); }" type="button">
        Trở lại
      </button>
      <button class="btn btn-primary me-md-2" @click="createPrompt" type="button">
        Thêm mới
      </button>
      <button v-if="promptAI.id && !promptAI.isTemplate" class="btn btn-primary me-md-2" @click="updatePrompt"
        type="button">
        Cập nhật
      </button>
      <!-- <button
        v-if="promptAI.id"
        class="btn btn-danger me-md-2"
        @click="deletePrompt"
        type="button"
      >
        Delete
      </button> -->
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
      this.paramID = this.$route.query.param;
      console.log(this.paramID);
      const response = await axios.get(this.rootApi + "/admin/review-config/" + this.paramID);

      if (response.status == 200) {
        this.promptAI = response.data.result;
        console.log(response.data.result);
      } else {
        toast.error("Update Failed !");
      }
    } catch (error) {
      // toast.error("An error occurred while fill prompt!");
    }
  },
  data() {
    return {
      mockApi: "http://localhost:3000/prompt",
      rootApi: process.env.VUE_APP_ROOT_API,
      paramID: null,
      promptAI: {
        id: null,
        promptStructure: "",
        isActive: false,
      },
    };
  },

  methods: {

    async createPrompt() {
      try {
        this.promptAI.id = null;
        this.promptAI.isActive = false;
        // this.promptAI.isTemplate=false;
        const response = await axios.post(this.rootApi + "/admin/review-config", this.promptAI);
        console.log(this.promptAI);
        if (response.status === 200) {

          toast.success("Add Success !", {
            autoClose: 2000,
          });
        } else {
          toast.error("Add Failed !");
        }
      } catch (error) {
        toast.error("An error occurred while Add prompt!");
        console.log(error);
      }
    },

    async updatePrompt() {

      try {
        const response = await axios.put(
          this.rootApi + "/admin/review-config/" + this.promptAI.id,
          { promptStructure: this.promptAI.promptStructure }
        );
        console.log(this.promptAI.promptStructure);

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

    async deletePrompt() {
      try {
        const response = await axios.delete(this.rootApi + "/admin/review-config/" + this.promptAI.id);
        console.log(response.data);
        if (response.status === 200) {
          this.$router.push("/listPrompt")
          toast.success("delete  Success !", {
            autoClose: 2000,
          });
        } else {
          toast.error("delete Failed !");
        }
      } catch (error) {
        toast.error("An error occurred while delete prompt!");
        console.log(error);
      }
    },
  },
};
</script>
