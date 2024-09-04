<template>
  <form @submit.prevent="onSubmit" class="form-container">
    <h1>Cập nhật</h1>
    <div class="form-group">
      <label for="fullName">Name:</label>
      <input id="fullName" v-model="fullName" type="text" class="form-input" placeholder="Hãy Nhập Tên"/>
      <span class="form-error">{{ nameError }}</span>
    </div>
    <div class="form-group">
      <label for="age">Age:</label>
      <input id="age" v-model="age" type="number" class="form-input" placeholder="Hãy Nhập Tuổi"  />
      <span class="form-error">{{ ageError }}</span>
    </div>
    <button type="submit" class="form-submit">Submit</button>
  </form>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { toast } from 'vue3-toastify';
import { useField, useForm } from "vee-validate";
import * as yup from "yup";

const rootApi = process.env.VUE_APP_ROOT_API;
const router = useRouter();
const route = useRoute();

const { handleSubmit, resetForm } = useForm({
  validationSchema: yup.object({
    fullName: yup
    .string()
    .required("*Hãy nhập tên")
    .matches(/^[\p{L}\s]+$/u, "*Chỉ chứa kí tự chữ và khoảng trắng"),
    age: yup
      .number()
      .typeError('*Phải là số')
  
      .required('*Hãy nhập tuổi')
      .min(16, "*Tuổi phải lớn hơn 16")
      .max(70,"*Tuổi bé lớn hơn 70"),
  }),
});

const { value: fullName, errorMessage: nameError, setValue: setFullName } = useField("fullName");
const { value: age, errorMessage: ageError, setValue: setAge } = useField("age");

onMounted(() => {
  const studentId = route.params.id;
  axios.get(`${rootApi}/api/v1/users/${studentId}`)
    .then(res => {
      console.log(res.data.result)
      setFullName(res.data.result.fullName);
      setAge(res.data.result.age);
    })
    .catch(error => {
      console.error(error);
    });
});

const onSubmit = handleSubmit(async (values) => {
  const studentId = route.params.id;
  try {
    const response = await axios.put(`${rootApi}/api/v1/users/${studentId}`, values);
    if (response.status === 200) {
      console.log(values)
      resetForm();
      router.push("/").then(() => {
        toast.success("Cập nhật thành công!", {
          autoClose: 2000
        });
      });
    } else {
      toast.error("Cập nhật thất bại, Thử lại sau!");
    }
  } catch (error) {
    toast.error("An error occurred while updating the student!");
  }
});
</script>

<style scoped>
.form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 30px;
  background: #f4f4f9;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  border: 1px solid #ddd;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-size: 1.1rem;
  font-weight: 500;
  color: #333;
  margin-bottom: 8px;
}

.form-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  background-color: #fff;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
}

.form-input:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
}

.form-error {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 5px;
  display: block;
}

.form-submit {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 8px;
  background-color: #007bff;
  color: #fff;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.form-submit:hover {
  background-color: #0056b3;
  transform: scale(1.05);
}

.form-submit:active {
  background-color: #004085;
  transform: scale(1);
}
</style>
