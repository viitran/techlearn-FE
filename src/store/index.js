import { createStore } from "vuex";

export default createStore({
  state: {
    user: {
      role: "",
    },
  },
  getters: {
    getUserRole: (state) => state.user.role,
  },
  mutations: {
    SET_USER_ROLE(state, role) {
      state.user.role = role;
    },
  },
  actions: {
    setUserRole({ commit }, role) {
      commit("SET_USER_ROLE", role);
    },
  },
  modules: {},
});
