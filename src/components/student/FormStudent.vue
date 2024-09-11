<template>
    <div class="row d-md-flex justify-content-between nav-student">
        <div class="col col-md-3 d-md-flex justify-content-between align-items-center">
            <div class="img-avatar">
                <img class="rounded-circle"
                    src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper.png"
                    alt="my-avatar">
            </div>
            <div class="d-flex flex-column align-items-center m-0">
                <div class="font-weight-bold name-color">Huang Phan</div>
                <div class="info-student">Học viên</div>
                <div class="info-student">hoang@gmail.com</div>
            </div>
        </div>
        <div v-if="stateButtonFormStudent === true" class="col col-md-9 d-flex align-items-center p-0">
            <form @submit.prevent="searchCalendar" class="row w-100">
                <div class="col col-md-11 d-flex justify-content-evenly">
                    <div>
                        <div>
                            <label class="font-weight-bold" for="module">Module</label>
                            <span class="error-message">{{ moduleError }}</span>
                        </div>
                        <div>
                            <select class="modify-select" name="module" v-model="module">
                                <option value="" disabled selected hidden>Chọn module</option>
                                <option class="modify-option" value="module1">Module 1</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <div>
                            <label class="font-weight-bold" for="chuong">Chương</label>
                            <span class="error-message">{{ chuongError }}</span>
                        </div>
                        <div>
                            <select class="modify-select" name="chuong" v-model="chuong">
                                <option value="" disabled selected hidden>Chọn chương</option>
                                <option class="modify-option" value="chuong1">Chương 1</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <div>
                            <label class="font-weight-bold" for="giangvien">Giảng viên</label>
                            <span class="error-message">{{ teacherError }}</span>
                        </div>
                        <div>
                                <select class="modify-select" name="giangvien" v-model="giangvien">
                                    <option :value="null" disabled selected hidden>Chọn giảng viên</option>
                                    <option class="modify-option"  v-for="teacher in allTeachers" :key="teacher.id" :value="teacher">
                                        {{ teacher.OwnerText }}
                                    </option>
                                </select>
                        </div>
                    </div>
                </div>
                <div class="col col-md-1 d-flex justify-content-center align-items-center mt-4">
                    <button type="submit" class="btn btn-primary border-0 modify-button">
                        <span><i class="fa-solid fa-filter"></i> Filter</span>
                    </button>
                </div>
            </form>
        </div>
        <div v-if="stateButtonFormStudent === false" class="col col-md-1 d-flex align-items-center justify-content-center">
            <button @click="changeOfStateButtonStudent" class="btn btn-primary border-0 modify-button">
                <span><i class="fa-solid fa-plus"></i> Tạo lịch</span>
            </button>
        </div>
    </div>
    <div v-if="stateButtonFormStudent === true" class="row">
        <div class="col">
            <Calendar :url="url" :id="idGV"/>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { useField, useForm } from 'vee-validate';
import { onMounted } from 'vue';
import { ref } from 'vue';
import { toast } from 'vue3-toastify';
import * as yup from 'yup';
import Calendar from '../Calendar/Calendar.vue';



const stateButtonFormStudent = ref(false);

const { handleSubmit, resetForm } = useForm({
    validationSchema: yup.object({
        module: yup
            .string()
            .required('*'),
        chuong: yup
            .string()
            .required('*'),
        giangvien: yup
            .object().nullable()
            .required('*')
    }),
});

const { value: module, errorMessage: moduleError } = useField('module');
const { value: chuong, errorMessage: chuongError } = useField('chuong');
const { value: giangvien, errorMessage: teacherError } = useField('giangvien');
const allTeachers = ref([]);
const url =ref("");
const idGV = ref()
// value default option in select
module.value = "";
chuong.value = "";
giangvien.value = null;


const getAllCalendars =  () =>{
    url.value="http://localhost:8181/api/v1"
}
const getAllTeacher = async () => {
    try {
        const res = await axios.get(`http://localhost:8181/api/v1/teachers/`);
        allTeachers.value=res.data;
    } catch (error) {
        console.log(error);
    }
}

const filterEventsByOwner = (events) => {
  return events.filter(event => event.OwnerIds.includes(1));
};

const changeOfStateButtonStudent = () => {
    stateButtonFormStudent.value = !stateButtonFormStudent.value;
}

const searchCalendar = handleSubmit ( async (formData) => {
    try {
        const res = await axios.get(`http://localhost:8181/api/v1/teacher-calendar/find-by-id/${formData.giangvien.Id}`);
        if (res.status === 200) {
            resetForm();
            module.value = "";
            chuong.value = "";
            giangvien.value = null;
            idGV.value = res.data[0].OwnerId
        }
    } catch (error) {
        toast.error("Error your submit. Please try again!");
    }
});

onMounted(() => {
    getAllTeacher();
    getAllCalendars();
})
</script>

<style scoped>
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

.img-avatar img {
    width: 75px;
    height: 75px;
}

.modify-button {
    padding: 6px 12px;
}

.name-color {
    color: #6B7A99;
}

.info-student {
    color: var(--text-color);
    font-size: 13px;
}

.modify-select {
    border-radius: 8px;
    padding: 8px;
    color: var(--text-color);
}

.modify-option {
    color: rgb(45, 34, 34);
}

.error-message {
    color: #dc3545;
    font-size: 0.875rem;
}

.input-time {
    max-width: 75px;
    height: auto;
}
</style>