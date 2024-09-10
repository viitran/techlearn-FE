<template>
  <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Cập Nhật Lịch</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeModal">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <label class="label-modal">Title</label>
          <input type="text" v-model="title" placeholder="Title" class="input-modal"/>
          <br>
          <span class="span-modal">All day</span>
          <label class="switch">
            <input type="checkbox" @click="checkAllDay" v-model="allDay" :checked="allDay">
            <span class="slider round"></span>
          </label>
          <br>
          <label class="label-modal">Note</label>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="closeModal">Đóng</button>
          <button type="button" class="btn btn-primary" @click="confirmDelete" :disabled="!isDelete">xóa</button>
          <button type="button" class="btn btn-primary" @click="confirmUpdate" :disabled="isDelete">Cập nhật</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { defineEmits, defineProps } from 'vue';


const props = defineProps({
  titles: String,
  notes: String,
  allDay: Boolean,
  isDelete: Boolean
});

const emit = defineEmits(['confirmUpdate', 'close', 'checkAllDay','confirmDelete']);

const title = ref(props.titles);
const note = ref(props.notes);
const allDay = ref(props.allDay);
const isDelete = ref(props.isDelete);


watch(() => props.titles,
(newTitle) => {
    title.value = newTitle;
  }
);

watch(() => props.isDelete,
(newIsDelete) => {
  isDelete.value = newIsDelete;
  }
);


watch(() => props.allDay,
(newAllDay) => {
    allDay.value = newAllDay;
  }
);

watch(() => props.notes,
  (newNote) => {
    note.value = newNote;
  }
);

const confirmDelete =() => {
  emit('confirmDelete');
}
const checkAllDay = (e) =>{
 allDay.value = e.target.checked;
  emit('checkAllDay', allDay.value)
}

const confirmUpdate = () => {
  emit('confirmUpdate', title.value, note.value);
};

const closeModal = () => {
  emit('close');
};
</script>

<style scoped>
.input-modal {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ced4da;
  border-radius: 5px;
  font-size: 1rem;
  box-sizing: border-box;
}

.label-modal {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #333;
}

.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 20px;
  margin: 10px 0 0 10px;
  padding-bottom: 7px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 15px;
  width: 15px;
  left: 4px;
  bottom: 2px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

.span-modal {
  font-weight: bold;
}
</style>
