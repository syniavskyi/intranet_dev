import axios from 'axios'
import router from '@/router/index.js'

const state = {
  loginError: false,
  sendEmailSuccess: false,
  username: null,
  userId: null,
  userData: {}
}

const mutations = {
  AUTH_USER(state, token) {
    state.idToken = token;
  },
  SET_LOGIN_ERROR(state, isError) {
    state.loginError = isError
  },
  SET_EMAIL_SUCCESS(state, isSuccess) {
    state.sendEmailSuccess = isSuccess
  },
  SET_USERNAME(state, username) {
    state.username = username
  },
  SET_USER_ID(state, userId) {
    state.userId = userId
  },
  SET_USER_DATA(state, data) {
    state.userData = data;
  },
  SET_PHOTO(state, photoUrl) {
    state.userData.image = photoUrl
  }

}

const actions = {
  login({
    commit,
    dispatch
  }, authData) {
    commit('CLEAR_AUTH_DATA');
    const md5 = require('js-md5')
    var hashedPassword = md5(authData.password)
    var params = new URLSearchParams()
    params.append('grant_type', 'password')
    params.append('username', authData.username)
    params.append('password', hashedPassword)
    axios({
      method: 'post',
      url: 'oauth/token',
      auth: {
        username: 'vuejs-client',
        password: 'password'
      },
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
      },
      data: params
    }).then(res => {
      console.log(res)
      commit('SET_LOGIN_ERROR', false)
      commit('AUTH_USER', res.data.access_token)
      commit('DISPLAY_MENU', true)

      localStorage.setItem('token', res.data.access_token)

     
      dispatch('setExpirationDate', res.data.expires_in)
      dispatch('setLogoutTimer', res.data.expires_in)
      dispatch('getUsername', res.data.access_token)

      router.replace('/dashboard')
    }).catch(error => {
      console.log(error)
      commit('SET_LOGIN_ERROR', true)
    })
  },
  setLogoutTimer({
    commit,
    dispatch
  }, expirationTime) {
    setTimeout(() => {
      dispatch('logout')
    }, expirationTime * 1000)
  },
  setExpirationDate({
    commit
  }, expiresIn) {
    const now = new Date()
    const expirationDate = new Date(now.getTime() + expiresIn * 1000)
    localStorage.setItem('expirationDate', expirationDate);
  },
  tryAutoLogin({
    commit,
    dispatch
  }) {
    commit('SET_LOGIN_ERROR', false)
    const token = localStorage.getItem('token')
    if (!token) {
      return
    }
    const expirationDate = localStorage.getItem('expirationDate')
    const now = new Date()
    if (now >= expirationDate) {
      return
    }
    dispatch('getUsername', token)
    commit('AUTH_USER', token)
    commit('DISPLAY_MENU', true);
    router.replace('/dashboard');
  },
  getUsername({ commit, getters, dispatch }, token) {
    dispatch('getDepartmentList')
    var URL = '/api/getUsernameByToken?access_token=' + token

    axios.get(URL).then(res => {
      var departmentId = res.data.deps[0].depName;
      for (var i = 0; i < getters.depList.length; i++) {
        if (departmentId = getters.depList[i].depId) {
          var departmentName = getters.depList[i].depName
        }
      }

      const userdata = {
        departmentId: departmentId,
        departmentName: departmentName,
        username: res.data.username,
        email: res.data.userContacts[0].email,
        role: res.data.roles[0].name,
        birthDate: res.data.userInfo[0].birthDate,
        firstName: res.data.userInfo[0].firstName,
        gender: res.data.userInfo[0].gender,
        lastName: res.data.userInfo[0].lastName,
        skype: res.data.userContacts[0].skypeId,
        slack: res.data.userContacts[0].slackId,
        phone: res.data.userContacts[0].phone,
        address: res.data.userContacts[0].address,
        id: res.data.id,
        image: res.data.userInfo[0].image
      }

      localStorage.setItem('username', userdata.username)
      localStorage.setItem('role', userdata.role)
      localStorage.setItem('id', userdata.id)

      commit('SET_USER_ROLE', userdata.role)
      commit('SET_USER_DATA', userdata)
      commit('SET_USERNAME', userdata.username)
      commit('SET_USER_ID', userdata.id)

    }).catch(error => {
      console.log(error)
    })
  },
  sendEmailWithPass({
    commit,
    dispatch,
    getters
  }, email) {
    dispatch('generatePassword')
    var params = new URLSearchParams()
    params.append('password', getters.hashedPassword)
    params.append('plain_password', getters.password)
    params.append('email', email)

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
      console.log(error)
    })
  }

}

const getters = {
  isAuthenticated(state) {
    return state.idToken !== null
  },
  isLoginError(state) {
    return state.loginError
  },
  isSendEmailSuccess(state) {
    return state.sendEmailSuccess
  },
  userData(state) {
    return state.userData
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}



// getUserRole({commit}, access_token){
//     var URL = '/api/getCurrentRole?access_token=' + access_token
//     axios.get(URL).then(res => {
//         const role = res.data[0].authority
//         localStorage.setItem('userRole', role)
//         commit('SET_USER_ROLE', role)
//     }).catch(error => {
//         console.log(error)
//     })
// },
