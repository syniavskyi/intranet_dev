import axios from 'axios'

const state = {
  email: '',
  mail: '',
  registrationError: false
};

const mutations = {
  SET_REGISTRATION_ERROR(state, isError) {
    state.registrationError = isError
  }
};

const actions = {
  submitRegistration({
    commit
  }, data) {
    data.openDialog = true;
    commit('OPEN_DIALOG', data.openDialog);
    axios.post('/api/register', {
      Action: "R",
      Email: data.mail,
      Role: data.role,
      Fullname: data.fullname,
      DepartmentId: data.department,
      Language: data.mailLang
    }).then(function (response) {
      commit('SET_REGISTRATION_ERROR', false)
    }).catch(function (error) {
      commit('SET_REGISTRATION_ERROR', false)
    })
  },
};

const getters = {
  getRegistrationError(state) {
    return state.registrationError
  }
};

export default {
  state,
  mutations,
  actions,
  getters
}
