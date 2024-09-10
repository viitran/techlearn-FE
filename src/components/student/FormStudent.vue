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
        <div v-if="stateButtonFormStudent === false"
            class="col col-md-1 d-flex align-items-center justify-content-center">
            <button @click="changeOfStateButtonStudent" class="btn btn-primary border-0 modify-button">
                <span><i class="fa-solid fa-plus"></i> Tạo lịch</span>
            </button>
        </div>
    </div>

    <!-- form data -->
    <div v-if="stateButtonFormStudent === true" class="row mt-5">
        <div class="col col-md-3 p-0 m-0">
            <form @submit.prevent="submitFormStudent">
                <h5 class="font-weight-bold mb-2">Đặt lịch</h5>
                <div class="mt-1 mb-1">
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
                <div class="mt-1 mb-1">
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
                <div class="mt-1 mb-1">
                    <div>
                        <label class="font-weight-bold" for="baitap">Bài tập</label>
                        <span class="error-message">{{ baitapError }}</span>
                    </div>
                    <div>
                        <select class="modify-select" name="baitap" v-model="baitap">
                            <option value="" disabled selected hidden>Chọn bài tập</option>
                            <option class="modify-option" value="baitap1">Bài tập 1</option>
                        </select>
                    </div>
                </div>
                <div class="mt-1 mb-1">
                    <div>
                        <label class="font-weight-bold" for="giangvien">Giảng viên</label>
                        <span class="error-message">{{ teacherError }}</span>
                    </div>
                    <div>
                        <select class="modify-select" name="giangvien" v-model="giangvien">
                            <option value="" disabled selected hidden>Chọn giảng viên</option>
                            <option class="modify-option" value="giangvien1">Giảng viên 1</option>
                        </select>
                    </div>
                </div>
                <div class="d-flex flex-column">
                    <div class="mt-1">
                        <label class="font-weight-bold" for="ngaygio">Ngày/ giờ</label>
                        <span class="error-message">{{ startTimeError }}</span>
                        <span class="error-message">{{ endTimeError }}</span>
                    </div>
                    <div class="mt-1">
                        Thứ 2, ngày 09 tháng 09 năm 2024
                    </div>
                    <div class="d-md-flex justify-content-evenly align-items-center mt-1">
                        <input type="time" name="startTime" class="border border-1 p-2 mb-1 mb-md-0 input-time"
                            v-model="startTime" /><span class="d-none d-md-block">-</span><input type="time"
                            class="border border-1 p-2 mt-1 mt-md-0 input-time" name="endTime" v-model="endTime" />
                    </div>
                </div>
                <div class="d-flex justify-content-evenly mt-2">
                    <div class="me-1 ms-md-0"><button @click="changeOfStateButtonStudent"
                            class="btn btn-light ps-2 pe-2 border border-1">Hủy
                            bỏ</button></div>
                    <div class="ms-1 ms-md-0"><button type="submit" class="btn btn-primary ps-2 pe-2">Đặt lịch</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { useField, useForm } from 'vee-validate';
import { ref } from 'vue';
import { toast } from 'vue3-toastify';
import * as yup from 'yup';
const rootApi = process.env.VUE_APP_ROOT_API;

const stateButtonFormStudent = ref(false);
const resultCalendar = ref();
const timeFormat = /^\d{2}:\d{2}$/;

const { handleSubmit, resetForm } = useForm({
    validationSchema: yup.object({
        module: yup
            .string()
            .required('*'),
        chuong: yup
            .string()
            .required('*'),
        baitap: yup
            .string()
            .required('*'),
        giangvien: yup
            .string()
            .required('*'),
        startTime: yup
            .string()
            .required('* Hãy nhập thời gian bắt đầu')
            .matches(timeFormat, '* Thời gian bắt đầu không đúng định dạng'),
        endTime: yup
            .string()
            .required('* Hãy nhập thời gian kết thúc')
            .matches(timeFormat, '* Thời gian kết thúc không đúng định dạng')
            .test('is-greater', '* Thời gian kết thúc phải lớn hơn thời gian bắt đầu', function (value) {
                const { startTime } = this.parent;
                if (startTime && value) {
                    return value > startTime;
                }
                return true;
            })
    }),
});

const { value: module, errorMessage: moduleError } = useField('module');
const { value: chuong, errorMessage: chuongError } = useField('chuong');
const { value: baitap, errorMessage: baitapError } = useField('baitap');
const { value: giangvien, errorMessage: teacherError } = useField('giangvien');
const { value: startTime, errorMessage: startTimeError } = useField('startTime');
const { value: endTime, errorMessage: endTimeError } = useField('endTime');

// value default option in select
module.value = "";
chuong.value = "";
baitap.value = "";
giangvien.value = "";

const changeOfStateButtonStudent = () => {
    stateButtonFormStudent.value = !stateButtonFormStudent.value;
}

const submitFormStudent = handleSubmit(async (formData) => {
    try {
        const res = await axios.post(`${rootApi}/`, formData);
        if (res.status === 201) {
            resetForm();
        }
    } catch (error) {
        toast.error("Error your submit. Please try again!");
    }
});

const searchCalendar = async (keyWord) => {
    try {
        const res = await axios.post(`${rootApi}/`, keyWord);
        if (res.status === 200) {
            resetForm();
        }
    } catch (error) {
        toast.error("Error your submit. Please try again!");
    }
}
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
    width: 100%;
    height: auto;
    border-radius: 8px;
    padding: 8px;
    color: var(--text-color);
}

.modify-option {
    color: rgb(120, 114, 114);
}

.error-message {
    color: #dc3545;
    font-size: 0.875rem;
}

.input-time{
    max-width: 75px;
    height: auto;
}
</style>