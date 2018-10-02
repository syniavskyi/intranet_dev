import axios from 'axios'
import router from '@/router/index.js'

const state = {
  loginError: false,
  sendEmailSuccess: false,
  sendEmailError: false,
  username: null,
  urlQuery: null,
  password: null,
  hashedPassword: null,
  token: ''
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
  },
  SET_PASSWORD (state, data) {
    state.password = data;
  },
  SET_HASHED_PASSWORD (state, password) {
      state.hashedPassword = password;
  },
  SET_LOGIN_ALIAS(state, data) {
      state.username = data;
  },
  SET_TOKEN(state, data){
    state.token = data;
  }
}

const actions = {
  login({
    commit,
    dispatch
  }, authData) {
    let url = '?sap-user=' + authData.username + '&sap-password=' + authData.password + '&sap-language=' +authData.language
    commit('SET_LOGIN_ALIAS', authData.username.toUpperCase());
    axios({
      method: 'get',
      url: url,
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=utf-8",
        "X-CSRF-Token" : "Fetch"
      }
    }).then(res => {
      localStorage.setItem('authorized', true);
      commit('SET_URL_QUERY', url);
      commit('SET_LOGIN_ERROR', false);
      let sToken = res.request.getResponseHeader('x-csrf-token');
      commit('SET_TOKEN', sToken);

      let userData = {
        user: authData.username,
        lang: authData.language,
        changePage: true
      }
      dispatch('loadData', userData);
    }).catch(error => {
      console.log(error);
      commit('SET_LOGIN_ERROR', true);
      commit('SET_DISPLAY_LOADER', false);
    })
  },
  sendEmailWithPass({
    commit
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
  generatePassword({commit, state}) {
    const md5 = require('js-md5')

    var nLength = 8,
        sCharset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]\:;?><,./-=",
        sRetVal = "";

    for (var i = 0, n = sCharset.length; i < nLength; ++i) {
        sRetVal += sCharset.charAt(Math.floor(Math.random() * n));
    }

    var hash = md5(sRetVal)
    commit('SET_HASHED_PASSWORD', hash)
    commit('SET_PASSWORD', sRetVal)
  }
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
  },
  password(state) {
    return state.password;
  },
  hashedPassword(state) {
      return state.hashedPassword;
  },
  getLoginAlias(state) {
      return state.username;
  },
  getToken(state) {
    return state.token;
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}


