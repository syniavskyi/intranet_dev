import axios from 'axios'
import router from '@/router/index.js'
import i18n from '../../lang/lang'

const state = {
  saveChangesSuccess: true,
  uploadPhotoError: false,
  uploadFileError: false,
  languageList:[
    {id: 'PL', name: 'Polski'},
  {id: 'EN', name: 'Angielski'},
{id:'DE', name: 'Niemiecki'}]
};

const mutations = {
  SET_SAVE_CHANGES_STATE(state, isSuccess) {
    state.saveChangesSuccess = isSuccess
  },
  SET_PHOTO_ERROR(state, isError) {
    state.uploadPhotoError = isError
  },
  SET_FILE_ERROR(state, isError) {
    state.uploadFileError = isError
  }
};

const actions = {
  saveContactData({
    commit
  }, userData) {
    commit('SET_USER_DATA', userData)
    var params = new URLSearchParams()
    params.append('id', localStorage.getItem('id'))
    params.append('address', encodeURI(userData.address))
    params.append('phone', userData.phone)
    params.append('email', userData.email)
    params.append('skypeId', userData.skype)
    params.append('slackId', userData.slack)

    axios({
      method: 'post',
      url: '/api/user/edit/contactNew/',
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
      },
      data: params
    }).then(res => {
      commit('SET_SAVE_CHANGES_STATE', true)
      console.log(res)
    }).catch(error => {
      commit('SET_SAVE_CHANGES_STATE', false)
      console.log(error)
    })
  },
  saveUserData({
    commit
  }, userData) {
    commit('SET_USER_DATA', userData)
    var params = new URLSearchParams()
    params.append('id', localStorage.getItem('id'))
    params.append('currentProject', encodeURI(userData.currentProject))
    params.append('employmentDate', userData.employmentDate)
    params.append('state', encodeURI(userData.state))
    params.append('branch', encodeURI(userData.branch))
    params.append('section', encodeURI(userData.section))
    params.append('position', encodeURI(userData.position))
    axios({
      method: 'post',
      url: '/api/user/edit/detail',
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
      },
      data: params
    }).then(res => {
      commit('SET_SAVE_CHANGES_STATE', true)
      commit('SET_SENIORITY', res.data)
      console.log(res)
    }).catch(error => {
      commit('SET_SAVE_CHANGES_STATE', false)
      console.log(error)
    })
  },

  submitPhoto({
    commit
  }, data) {
    let formData = new FormData()
    formData.append('file', data.file)
    formData.append('id', data.id)
    axios({
      method: 'post',
      url: '/api/files/uploadImage',
      headers: {
        "Content-type": "multipart/form-data"
      },
      data: formData
    }).then(res => {
      console.log(res)
      commit('SET_PHOTO', res.data.fileDownloadUri)
      commit('SET_PHOTO_ERROR', false)
    }).catch(error => {
      commit('SET_PHOTO_ERROR', true)
      console.log(error)
    })
  },
  submitCv({
    commit
  }, data) {
    let formData = new FormData()
    formData.append('file', data.file)
    formData.append('id', data.id)
    axios({
      method: 'post',
      url: '/api/files/uploadFile',
      headers: {
        "Content-type": "multipart/form-data"
      },
      data: formData
    }).then(res => {
      commit('SET_CV', res.data.fileDownloadUri)
      commit('SET_FILE_ERROR', false)
      console.log(res)
    }).catch(error => {
      console.log(error)
      commit('SET_FILE_ERROR', false)
    })
  },
};

const getters = {
  isSaveChangesSuccess(state) {
    return state.saveChangesSuccess
  },
  isSavePhotoError(state) {
    return state.isSavePhotoError
  },
  isFileUploadError(state) {
    return state.isFileUploadError
  },
  getLanguageList(state){
    return state.languageList
  }
};

export default {
  state,
  mutations,
  actions,
  getters
}
