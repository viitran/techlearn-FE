import { createRouter, createWebHistory } from 'vue-router'
import Students from '@/components/student/Students.vue'
import StudentUpdate from '@/components/student/StudentUpdate.vue'
import NotFound from '@/components/NotFound/NotFound.vue'
import StudentCreate from '@/components/student/StudentCreate.vue'
import ConfigPromptAIView from '@/views/teacherView/ConfigPromptAIView.vue'
import SubmitAssignment from '@/views/SubmitAssignment.vue'

const routes = [
  {
    path: '/',
    name: 'StudentList',
    component: Students
  },
  {
    path: '/student/:id',
    name: 'StudentDetail',
    component: StudentUpdate,
    props: true
  },
  {
    path: '/create-student',
    name: 'StudentCreate',
    component: StudentCreate,
    props: true
  },{
    path: '/configPrompt',
    name: 'configPrompt',
    component: ConfigPromptAIView,
    props: true
  },
  {
    path: "/submitAssignment",
    name: "submitAssignment",
    component: SubmitAssignment,
    props: true
  },
  {
    path: "/:catchAll(.*)",
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
// onMounted(() => {
//   myModal.value = new bootstrap.Modal(document.getElementById("exampleModal"));
//   fetchStudents();
// });

// const handleDelete = async (data) => {
//   try {
//     await axios.delete(`${rootApi}/api/v1/users/${data.id}`);
//     list.value = list.value.filter((item) => item.id !== data.id);
//     closeModal();
//   } catch (error) {
//     console.error('Error deleting student:', error);
//   }
// };

// const openModal = (student) => {
//   seletedObject.value = student;
//   myModal.value.show();
// };

// const closeModal = () => {
//   myModal.value.hide();
// };
