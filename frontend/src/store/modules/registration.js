import axios from 'axios'

const state = {
  email: '',
  mail: '',
  registrationError: false,
  isDialogOpen: false
};

const mutations = {
  SET_REGISTRATION_ERROR(state, isError) {
    state.registrationError = isError
  }
};

const actions = {
  submitRegistration({
    commit, getters
  }, data) {
    // data.openDialog = true;
    let url = 'Users'
    let sToken = getters.getToken;
    let cookie = getters.getCookie;
    data.Action = "R";
    // commit("SET_DISPLAY_LOADER", true);
    commit("SET_DIALOG_CONFIRM", true);

    // axios({
    //   url: url,
    //   data: data,
    //   method: 'post',
    //   headers: {
    //     "Content-Type": "application/json",
    //     "X-Requested-With": "XMLHttpRequest",
    //     "Cache-Control": "no-cache",
    //     "x-csrf-token": sToken,
    //     "Cookie": cookie
    //   }
    // }).then(res => {
    //   commit("SET_DIALOG_CONFIRM", true);
    //   commit("SET_DISPLAY_LOADER", false);
      
    // }).catch(error => {
    //   commit("SET_DISPLAY_LOADER", false);
    // })
  },

  closeConfirmDialog({
    commit
  }){
    commit("SET_DIALOG_CONFIRM", true);
  }
};

const getters = {
  getRegistrationError(state) {
    return state.registrationError
  },
  getConfirmDialogOpen(state){
    return state.isDialogOpen;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
}
