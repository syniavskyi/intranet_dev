import axios from 'axios'
import i18n from '../../lang/lang'
import odata from 'odata'

let utils = require('../../utils')

const state = {
  saveChangesSuccess: true,
  uploadPhotoError: false,
  uploadFileError: false,
  cvLanguageList: [{
      id: 'en',
      description: i18n.t('select.cvLanguage.english')
    },
    {
      id: 'pl',
      description: i18n.t('select.cvLanguage.polish')
    },
    {
      id: 'de',
      description: i18n.t('select.cvLanguage.german')
    },
    {
      id: 'ru',
      description: i18n.t('select.cvLanguage.russian')
    }
  ],
  showChangePasswordDialog: false
};

const mutations = {
  SET_SHOW_CHANGE_PASSWORD_DIALOG(state, show) {
    state.showChangePasswordDialog = show
  },
  SET_SAVE_CHANGES_STATE(state, isSuccess) {
    state.saveChangesSuccess = isSuccess;
  },
  SET_PHOTO_ERROR(state, isError) {
    state.uploadPhotoError = isError;
  },
  SET_FILE_ERROR(state, isError) {
    state.uploadFileError = isError;
  }
};

const actions = {
  saveUserData({
    commit, getters
  }, userData) {
    userData.Action = 'E'
    userData.Language = 'PL'

    // Temporary, needed to be change to array.splice()
    delete userData.UserCvProjects;
    delete userData.UserEducations;
    delete userData.UserExperiences;
    delete userData.imgUrl;
    delete userData.UserSkills;
    delete userData.UserLang;
    delete userData.UserAuth;
    delete userData.UserFiles;

    userData.EmploymentDate = utils.formatDateForBackend(userData.EmploymentDate);

    const url = 'Users' + '(' + "UserAlias='" + userData.UserAlias + "',Language='" + userData.Language + "')"
    // odata(url).put(userData).save(function (data) {
    //   console.log("changed");
    // }, function (status) {
    //   console.error(status);
    // });
    let sToken = getters.getToken;
    let sCookie = getters.getCookie;
    axios({
      method: 'PUT',
      url: url,
      data: userData,
      headers: {
        "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          "Cache-Control": "no-cache",
          "x-csrf-token": sToken,
          "Cookie": sCookie
      }
    }).then(res => {

    }).catch(error => { 

    }) 
    commit('SET_USER_INFO', userData);
  },
  submitPhoto({
    commit
  }, data) {
    let slugHeader = data.file.name + ';' + data.type + ';' + data.language + ';' + data.userId + ';' + data.file.type;

    axios({
      method: 'POST',
      url: '/AttachmentMedias',
      auth: {
        username: 'psy',
        password: 'ides01'
      },
      data: data.file,
      headers: {
        "Content-type": data.file.type,
        "X-Requested-With": "XMLHttpRequest",
        "Slug": slugHeader
      }
    }).then(res => {
      // console.log(res);
    }).catch(error => {
      // console.log(error);
    })
  },

  submitPassword({
    getters
  }, userData) {
    let urlQuery = getters.getUrlQuery
    userData.Action = 'C'
    const url = 'http://nw5.local.pl:8050/sap/opu/odata/SAP/ZGW_INTRANET_SRV/Users' + '(' + "UserAlias='" + userData.UserAlias + "',Language='" + userData.Language + "')" + urlQuery
    let sToken = getters.getToken;
    axios.defaults.withCredentials = true
    let cookie = getters.getCookie; 
    delete userData.UserSkills
    delete userData.UserLang
    delete userData.UserFiles
    delete userData.UserExperiences
    delete userData.UserEducations
    delete userData.UserCvProjects
    delete userData.UserAuth
    axios({
      url: url,
      method: 'put',
      data: userData,
      headers: {
          // "Content-Type": "application/x-www-form-urlencoded",//"application/atom+xml; type=entry; charset=utf-8",
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          "Cache-Control": "no-cache",
          "x-csrf-token": sToken,
          "Cookie": cookie
      }
    }).then(res => {
        console.log(res)
      }).catch(error => {
        console.log(error);
    })

  },

  onLightUp({}, el) {
    const shadow = "0 0 20px orange";
    if (el.style) {
      el.style.boxShadow = shadow;
    }
  },
  onLightOut({}, el) {
    const shadow = "0 0 10px grey";
    if (el.style) {
      el.style.boxShadow = shadow;
    }
  }
};

const getters = {
  getSaveChangesSuccess(state) {
    return state.saveChangesSuccess;
  },
  getSavePhotoError(state) {
    return state.isSavePhotoError;
  },
  getFileUploadError(state) {
    return state.isFileUploadError;
  },
  getCvLanguageList(state) {
    return state.cvLanguageList;
  },
  getShowSelectChangePasswordDialog(state) {
    return state.showChangePasswordDialog
  }
};

export default {
  state,
  mutations,
  actions,
  getters
}
