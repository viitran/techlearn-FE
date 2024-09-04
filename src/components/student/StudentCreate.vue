<template>
  <form @submit.prevent="onSubmit" class="student-form">
    <h1>Thêm mới</h1>
    <div class="form-group">
      <label for="fullName">Họ và tên:</label>
      <input id="fullName" v-model="fullName" type="text" class="form-control" placeholder="Hãy Nhập Tên" />
      <span class="error-message">{{ nameError }}</span>
    </div>
    <div class="form-group">
      <label for="age">Tuổi:</label>
      <input id="age" v-model="age" type="number" class="form-control"  placeholder="Hãy Nhập Tuổi" />
      <span class="error-message">{{ ageError }}</span>
    </div>
    <button type="submit" class="submit-btn">Submit</button>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { toast } from 'vue3-toastify';
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';
const rootApi = process.env.VUE_APP_ROOT_API;


const router = useRouter();

const { handleSubmit, resetForm } = useForm({
  validationSchema: yup.object({
    fullName: yup
    .string()
    .required('*Hãy nhập tên')
    .matches(/^[\p{L}\s]+$/u, "*Chỉ chứa kí tự chữ và khoảng trắng")
    ,
    age: yup
      .number()
      .typeError('* Phải là số')
      .required('* Hãy nhập tuổi')
      .min(16, "* Tuổi phải lớn hơn 16")
      .max(70,"* Tuổi phải bé hơn 70"),
  }),
});

const { value: fullName, errorMessage: nameError } = useField('fullName');
const { value: age, errorMessage: ageError } = useField('age');

const onSubmit = handleSubmit(async (values) => {
  try {
    const response = await axios.post(`${rootApi}/api/v1/users`, values);
    if (response.status === 200) {
      resetForm();
      router.push('/').then(() => {
        toast.success('Thêm mới thành công!', {
          autoClose: 2000
        });
      });
    } else {
      toast.error('Thêm mới thất bại!');
    }
  } catch (error) {
    toast.error('An error occurred while creating the student!');
  }
});
</script>

<style scoped>
.student-form {
  max-width: 600px;
  margin: 20px auto;
  padding: 25px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #333;
}

.form-control {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ced4da;
  border-radius: 5px;
  font-size: 1rem;
  box-sizing: border-box;
}

.error-message {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.submit-btn {
  background-color: #007bff;
  color: #ffffff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 16px;
    font-weight: bold;
    width: 100%;
}

.submit-btn:hover {
  opacity: 0.5;
}
</style>