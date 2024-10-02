  
  <template>
    <div v-if="isOpen" class="custom-modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="userModalLabel">Thông tin cá nhân</h5>
            <button type="button" class="close" @click="closeModal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div v-if="userInfo">
              <div class="text-center">
                <img :src="userInfo.avatar" alt="Avatar" class="img-fluid rounded-circle mb-3" />
              </div>           

            <div class="user-info">
  <div class="label"><strong>Tên:</strong></div>
  <div class="value">{{ userInfo.fullName }}</div>
  
  <div class="label"><strong>Email:</strong></div>
  <div class="value">{{ userInfo.email }}</div>
  
  <div class="label"><strong>Tuổi:</strong></div>
  <div class="value">{{ userInfo.age }}</div>

  <div class="label"><strong>Vai trò:</strong></div>
  <div class="value">{{ userInfo.roles.map(role => role.name).join(', ') }}</div>
  
  <div class="label"><strong>Điểm:</strong></div>
  <div class="value">{{ userInfo.points }}</div>
  
  <!-- <div class="label"><strong>Là Mentor:</strong></div>
  <div class="value">{{ userInfo.isMentor ? 'Có' : 'Không' }}</div>
  
  <div class="label"><strong>Là Giáo viên:</strong></div>
  <div class="value">{{ userInfo.isTeacher ? 'Có' : 'Không' }}</div> -->
</div>

        </div>
            <div v-else>
              <p>Đang tải thông tin người dùng...</p>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">Đóng</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, watch } from 'vue';
  import axios from 'axios';
  
  export default {
    props: {
      isOpen: {
        type: Boolean,
        default: false
      }
    },
    setup(props, { emit }) {
      const userInfo = ref(null);
  
      const fetchUserInfo = async () => {
        try {
          const response = await axios.get(`${process.env.VUE_APP_ROOT_API}/users/me`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
          });
          userInfo.value = response.data.result;
        } catch (error) {
          console.error("Error fetching user info", error);
          alert("Không thể tải thông tin người dùng");
        }
      };
  
      watch(() => props.isOpen, (newVal) => {
        if (newVal) {
          fetchUserInfo();
        }
      });
  
      const closeModal = () => {
        emit('update:isOpen', false);
      };
  
      return {
        userInfo,
        closeModal
      };
    }
  };
  </script>
  
  <style scoped>
 
  .custom-modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1050;
  display: block;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.5);
}

.modal-dialog {
  position: relative;
  margin: 5% auto;
  max-width: 400px; 
  width: 90%;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2); 
  max-height: 75vh; 
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-body {
  padding: 10px 0;
}

.modal-footer {
  text-align: right;
}


.modal-title {
  font-size: 1.25rem; 
  font-weight: 600;
}

p {
  font-size: 0.95rem; 
  line-height: 1.4;
}

button.close {
  border: none;
  background: none;
  font-size: 1.2rem;
}

.img-fluid {
  max-width: 80px; 
  border-radius: 50%; 
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); 
  transition: transform 0.2s ease-in-out;
}

.img-fluid:hover {
  transform: scale(1.05); 
}


button.btn {
  font-size: 0.9rem; 
  padding: 5px 15px; 
  border-radius: 5px;
}

button.btn-secondary {
  background-color: #6c757d;
  border-color: #6c757d;
}


.user-info {
  display: grid;
  grid-template-columns: max-content 1fr; 
  gap: 5px 10px; 
  font-size: 0.95rem;
  line-height: 1.5;
}

.label {
  text-align: left; 
  padding-right: 10px; 
}

.value {
  text-align: left; 
}


.info-item {
  display: contents; 
}


.info-item strong {
  font-weight: 600; 
  text-align: left; 
}


.info-item span {
  text-align: left; 
}


.img-fluid {
  max-width: 80px; 
  border-radius: 50%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
}

.img-fluid:hover {
  transform: scale(1.05);
}


.modal-footer {
  text-align: right;
}


button.close {
  border: none;
  background: none;
  font-size: 1.2rem;
}

button.btn {
  font-size: 0.9rem;
  padding: 5px 15px;
  border-radius: 5px;
}

button.btn-secondary {
  background-color: #6c757d;
  border-color: #6c757d;
}


  </style>
  