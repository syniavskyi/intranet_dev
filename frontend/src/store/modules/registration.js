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
    data.role = 'ROLE_' + data.role.toUpperCase();
    axios.post('/api/register', {
      username: data.name,
      password: data.password,
      passwordConfirmation: data.password,
      email: data.mail,
      roles: [data.role],
      deps: [data.department]
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
