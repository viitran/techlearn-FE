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
          <label class="label-modal">Note</label>
          <input type="text" v-model="note" placeholder="Note" class="input-modal"/>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="closeModal">Đóng</button>
          <button type="button" class="btn btn-primary" @click="confirmUpdate">Cập Nhật</button>
        </div>
      </div>
    </div>
  </div>
    </template>
    <script setup>
    import { ref } from 'vue';
    import { defineEmits } from 'vue';
    const emit = defineEmits(['confirmUpdate', 'close']);
    const title = ref("");
    const note = ref("");

    const confirmUpdate = () => {
      emit('confirmUpdate', title.value, note.value);
    };

    const closeModal = () => {
      emit('close');
    };

    </script>

<style >
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
</style>
