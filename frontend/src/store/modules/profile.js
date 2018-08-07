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
{id:'DE', name: 'Niemiecki'}],
userJobPositions: ["SAP Fiori Developer"]
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
  },
  SET_USER_JOB_POS(state,list){
    state.userJobPositions = list
  }
};

const actions = {
  saveUserData({
    commit
  }, userData) {
    commit('SET_USER_INFO', userData)
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
  },
  getUserJobPositions(state){
    return state.userJobPositions
  }
};

export default {
  state,
  mutations,
  actions,
  getters
}
