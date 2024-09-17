<template>
  <div class="h-100 ">
    <div class="container w-100 my-1 h-100    ">
      <div>
        <h4>CẤU HÌNH AI ĐÁNH GIÁ BÀI TẬP</h4>
      </div>
      <div class="text-center my-3"></div>
      <hr />
      <div class="my-2">
        <!--         <a href="">
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-plus-circle"
            viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
            <path
              d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
          </svg>
          Thêm mới cấu hình
        </a> -->
      </div>
      <div class="d-flex flex-wrap">
        <div class="card mx-1 my-1" style="width: 15.5rem" v-for="i of promptAI" v-bind:key="i.id">
          <div class="card-body">
            <div class="mb-2">
              <strong class="card-title strong">ID CẤU HÌNH : {{ i.id }}</strong>
              <span v-if="i.isActive" class="text-success ms-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                  class="bi bi-check2-circle" viewBox="0 0 16 16">
                  <path
                    d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0" />
                  <path
                    d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
                </svg>
                active
              </span>
              <div>
                <span v-if="i.isTemplate" class="text-secondary">(Template)</span>
              </div>
            </div>
            <p v-if="i.promptStructure.length > 150" :id="'popover-target' + i.id" class="card-text">
              {{ i.promptStructure.substring(0, 150) }}
              <span><span>
                  <span>... </span>
                </span>
                <b-popover :target="'popover-target' + i.id" triggers="hover" placement="right">
                  {{ i.promptStructure }}
                </b-popover>
              </span>
            </p>
            <p v-else class="card-text">{{ i.promptStructure }}</p>
          </div>
          <div class="p-3 d-flex flex-nonwrap mx-auto">
            <button @click="activePrompt(i.id)" href="#" class="btn my-2 btn-primary mx-1">Sử dụng</button>

            <router-link :to="{ path: '/configPrompt', query: { param: i.id } }">
              <button class="btn my-2 btn-secondary mx-1">
                Chỉnh sửa
              </button></router-link>
          </div>
        </div>
      </div>

      <!-- <div class="d-flex justify-content-center mt-5">
<nav aria-label="Page navigation example">
<ul class="pagination">
<li class="page-item"><a class="page-link" href="#">Previous</a></li>
<li class="page-item"><a class="page-link" href="#">1</a></li>
<li class="page-item"><a class="page-link" href="#">2</a></li>
<li class="page-item"><a class="page-link" href="#">3</a></li>
<li class="page-item"><a class="page-link" href="#">Next</a></li>
</ul>
</nav>
</div> -->
    </div>


  </div>
</template>

<script>
import axios from "axios";
import { toast } from "vue3-toastify";
import * as yup from "yup";

export default {
  mounted() {
    this.getAllPromt();
  },
  data() {
    return {
      mockApi: "http://localhost:3000/prompt",
      rootApi: process.env.VUE_APP_ROOT_API,
      page: null,
      pageSize: 10,
      promptAI: [],
    };
  },

  methods: {

    async getAllPromt() {
      try {
        const response = await axios.get(
          this.rootApi + "/admin/review-config",
          { page: 1, pageSize: 10 }
        );

        if (response.status == 200) {
          this.promptAI = response.data.result.items;

          console.log(response.data.result.items);
        } else {
          toast.error("Update Failed !");
        }
      } catch (error) {
        toast.error("An error occurred while fill prompt!");
      }
    },


    async activePrompt(idPrompt) {
      try {
        const response = await axios.patch(this.rootApi + "/admin/review-config/" + idPrompt);
        console.log(response.data);
        if (response.status === 200) {
          this.getAllPromt();
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