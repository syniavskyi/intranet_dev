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
    commit
  }, userData) {
    userData.Action = 'E'
    userData.Language = 'PL'

    // Temporary, needed to be change to array.splice()
    delete userData.UserCvProjects
    delete userData.UserEducations
    delete userData.UserExperiences
    delete userData.imgUrl
    delete userData.UserSkills
    delete userData.UserLang

    userData.EmploymentDate = utils.formatDateForBackend(userData.EmploymentDate)

    const url = 'Users' + '(' + "UserAlias='" + userData.UserAlias + "',Language='" + userData.Language + "')"
    odata(url).put(userData).save(function (data) {
      console.log("changed");
    }, function (status) {
      console.error(status);
    });
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
    userData.Action = ''
    const url = 'http://nw5.local.pl:8050/sap/opu/odata/SAP/ZGW_INTRANET_SRV/Users' + '(' + "UserAlias='" + userData.UserAlias + "',Language='" + userData.Language + "')" + urlQuery
    
    /* TEST */
    var xml = new XMLHttpRequest()
    var parser = new DOMParser()
    
    var params =  '<?xml version="1.0" encoding="utf-8"?>' +
      '<entry xml:base="http://nw5.local.pl:8050/sap/opu/odata/SAP/ZGW_INTRANET_SRV/" xmlns="http://www.w3.org/2005/Atom" xmlns:m="http://schemas.microsoft.com/ado/2007/08/dataservices/metadata" xmlns:d="http://schemas.microsoft.com/ado/2007/08/dataservices">'+
      "<id>http://nw5.local.pl:8050/sap/opu/odata/SAP/ZGW_INTRANET_SRV/Users(UserAlias='UIO',Language='')</id>" +
      "<title type='text'>Users(UserAlias='UIO',Language='')</title>" +
      "<updated>2018-09-17T08:20:36Z</updated>" +
      '<category term="ZGW_INTRANET_SRV.User" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme"/>' +
      '<content type="application/xml">' +
      '<m:properties>' +
      '<d:BranchId/>' +
      '<d:JobPosition/>' +
      '<d:BranchName/>' + 
      '<d:JobPositionKey/>' +
      '<d:NewPassword/>' +
      '<d:DateBirth m:null="true"/>' +
      '<d:PostalCode/>' +
      '<d:UserAlias>UIO</d:UserAlias>' +
      '<d:Action/>' +
      '<d:Fullname/>' +
      '<d:Lastname/>' +
       '<d:Role/>' +
       '<d:Street/>' +
       '<d:BuildingNumber/>' +
       '<d:ApartmentNumber/>' +
       '<d:Email/>' +
       '<d:Telephone/>' +
       '<d:SkypeId/>' +
       '<d:SlackId/>' +
       '<d:DepartmentId/>' +
       '<d:DepartmentName/>' +
       '<d:SectionId/>' +
       '<d:SectionName/>' +
       '<d:CurrentProject/>' +
       '<d:WorkTime/>' +
       '<d:EmploymentDate m:null="true"/>' +
       '<d:Language/>' +
       '<d:AddrNo/>'+
       '<d:City/>' +
       '<d:PersonNumber/>' +
       '<d:Firstname/>' +
       '<d:Password/>' +
      '</m:properties>' +
     '</content>'+
    '</entry>'
    
    xml.open("PUT", url, true);
    xml.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    // xml.withCredentials = false;
    // xml.setRequestHeader( 'Access-Control-Allow-Origin', '*');
    xml.onreadystatechange = function(evt) {
      var that = this;
    }
    var params = parser.parseFromString(params,"text/xml");
    xml.send(params);
    /* TEST */

    // odata(url).put(userData).save(function (data) {
    //   console.log("changed");
    // }, function (status) {
    //   console.error(status);
    // });
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
