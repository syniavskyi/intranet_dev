import axios from 'axios'
import router from '@/router/index.js'

const state = {
  loginError: false,
  sendEmailSuccess: false,
  sendEmailError: false,
  username: null,
  urlQuery: null
}

const mutations = {
  SET_LOGIN_ERROR(state, isError) {
    state.loginError = isError
  },
  SET_EMAIL_SUCCESS(state, isSuccess) {
    state.sendEmailSuccess = isSuccess
  },
  SET_EMAIL_ERROR(state, isError) {
    state.sendEmailError = isError
  },
  SET_URL_QUERY(state, data) {
    state.urlQuery = data
  }
}

const actions = {
  login({
    commit,
    dispatch,
    getters
  }, authData) {
    let url = '?sap-user=' + authData.username + '&sap-password=' + authData.password + '&sap-language=' +authData.language

    axios({
      method: 'get',
      url: url,
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
      }
    }).then(res => {
      localStorage.setItem('authorized', true)
      commit('SET_URL_QUERY', url)
      commit('SET_LOGIN_ERROR', false)

      let userData = {
        user: authData.username,
        lang: authData.language
      } 
      dispatch('loadData', userData)
    }).catch(error => {
      console.log(error)
      commit('SET_LOGIN_ERROR', true)
    })
  },
  sendEmailWithPass({
    commit,
    dispatch,
    getters
  }, email) {
    axios({
      method: 'post',
      url: '/api/user/password/reset',
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
      },
      data: params
    }).then(res => {
      commit('SET_EMAIL_SUCCESS', true)
    }).catch(error => {
      commit('SET_EMAIL_ERROR', true)
      console.log(error)
    })
  },
}

const getters = {
  isLoginError(state) {
    return state.loginError
  },
  isSendEmailSuccess(state) {
    return state.sendEmailSuccess
  },
  isSendEmailError(state) {
    return state.sendEmailError
  },
  getUrlQuery(state){
    return state.urlQuery
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}


