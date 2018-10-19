import axios from 'axios'
import router from '@/router/index.js'
import odata from 'odata'
let utils = require('../../utils')

const state = {
  departmentList: [],
  branches: [],
  userList: [],
  projectsList: [],
  contractorsList: [],
  isLoaded: false,
  userInfo: {},
  studyTypes: [],
  academicTitles: [],
  langLevels: [],
  workPositionList: [],
  sapDomains: ["ZINTRANET_DEPARTMENT", "ZINTRANET_AVAIL_TYPE", "ZINTRANET_AVAIL_STATUS", "ZINTRANET_BRANCH", "ZINTRANET_STUDIES_TYPES", "ZINTANET_ACADEMIC_TITLES", "ZINTRANET_LANG_LEVEL", "ZWORK_POS", "ZINTRANET_SAP_MODULES", 'ZINTRANET_PRIORITY', 'ZINTRANET_EVENT_TYPE', 'ZINTRANET_EVENT_TYPE', 'ZINTRANET_TARGET_GROUP', 'ZINTRANET_ROLES'],
  sapModulesList: [],
  newUserFiles: [],
  adverts: [],
  userAuth: [],
  availStatus: [],
  availType: [],
  targetGroup: [],
  roles: [],
  userPhotoUrl: null
};

const mutations = {
  SET_DEP_LIST(state, data) {
    state.departmentList = data;
  },
  SET_BRANCH_LIST(state, data) {
    state.branches = data;
  },
  GET_USER_LIST(state, data) {
    state.userList = data;
  },
  SET_DATA_LOADED(state, isLoaded) {
    state.isLoaded = isLoaded;
  },
  SET_CONTRACTORS_LIST(state, data) {
    state.contractorsList = data;
  },
  SET_PROJECTS_LIST(state, data) {
    state.projectsList = data;
  },
  SET_USER_INFO(state, data) {
    state.userInfo = data;
  },
  SET_STUDY_TYPES_LIST(state, data) {
    state.studyTypes = data;
  },
  SET_ACADEMIC_TITLES_LIST(state, data) {
    state.academicTitles = data;
  },
  SET_LANG_LEVELS(state, data) {
    state.langLevels = data
  },
  SET_WORK_POSITION_LIST(state, data) {
    state.workPositionList = data
  },
  SET_SAP_MODULES_LIST(state, data) {
    state.sapModulesList = data;
  },
  SET_NEW_USER_FILES_LIST(state, data) {
    state.newUserFiles = data;
  },
  SET_USER_AUTH(state, data) {
    state.userAuth = data;
  },
  SET_AVAIL_STATUS(state, data) {
    state.availStatus = data
  },
  SET_AVAIL_TYPE(state, data) {
    state.availType = data
  },
  SET_TARGET_GROUP(state, data) {
    state.targetGroup = data;
  },
  SET_ADVERTS(state, data) {
    state.adverts = data;
  },
  SET_ROLES(state, data) {
    state.roles = data;
  },
  SET_USER_PHOTO_URL(state, url) {
    state.userPhotoUrl = url
  }
};

const actions = {
  loadData({
    state,
    dispatch,
    getters
  }, userData) {

    for (let i = 0; i < getters.getFileTypes.length; i++) {
      dispatch('getDocuments', getters.getFileTypes[i])
    }

    for (let i = 0; i < state.sapDomains.length; i++) {
      let domainData = {
        name: state.sapDomains[i],
        lang: userData.lang
      };
      dispatch('getDomainValues', domainData)
    }
    dispatch('getContractorsList');
    dispatch('getIndustries', userData.lang);
    dispatch('getProjectsList');
    dispatch('getUsersLists');
    dispatch('getAllLanguages', );
    dispatch('getSchoolDesc', userData.lang);
    dispatch('getFieldOfStudyDesc', userData.lang);
    dispatch('getEvents')
    dispatch('getUserData', userData);
    dispatch('getAdverts');
  },
  loadUserData({
    state,
    dispatch,
    getters
    }, userData){

  },
  getDomainValues({
    commit,
    getters
  }, domainData) {
    let urlQuery = getters.getUrlQuery
    if (domainData.lang === undefined) {
      domainData.lang = "PL"
    }
    axios({
      method: 'GET',
      url: "Dictionaries" + urlQuery + "&$filter=Name eq '" + domainData.name + "' and Language eq '" + domainData.lang + "'",
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
      }
    }).then(res => {
      if (domainData.name == 'ZINTRANET_DEPARTMENT') {
        const aDepartments = res.data.d.results;
        commit('SET_DEP_LIST', aDepartments);
      } else if (domainData.name == 'ZINTRANET_BRANCH') {
        const aBranches = res.data.d.results;
        commit('SET_BRANCH_LIST', aBranches);
      } else if (domainData.name == 'ZINTRANET_STUDIES_TYPES') {
        const aTypes = res.data.d.results;
        commit('SET_STUDY_TYPES_LIST', aTypes);
      } else if (domainData.name == 'ZINTANET_ACADEMIC_TITLES') {
        const aTitles = res.data.d.results;
        commit('SET_ACADEMIC_TITLES_LIST', aTitles);
      } else if (domainData.name == 'ZINTRANET_LANG_LEVEL') {
        const aLevels = res.data.d.results;
        commit('SET_LANG_LEVELS', aLevels);
      } else if (domainData.name == 'ZWORK_POS') {
        const aWorkPos = res.data.d.results;
        commit('SET_WORK_POSITION_LIST', aWorkPos);
      } else if (domainData.name == 'ZINTRANET_SAP_MODULES') {
        const aSapModules = res.data.d.results;
        commit('SET_SAP_MODULES_LIST', aSapModules);
      } else if (domainData.name == 'ZINTRANET_PRIORITY') {
        const aPriority = res.data.d.results;
        commit('SET_PRIORITY', aPriority);
      } else if (domainData.name == 'ZINTRANET_EVENT_TYPE') {
        const aEventType = res.data.d.results;
        commit('SET_EVENT_TYPE', aEventType);
      } else if (domainData.name == 'ZINTRANET_AVAIL_STATUS') {
        const aStatus = res.data.d.results;
        commit('SET_AVAIL_STATUS', aStatus);
      } else if (domainData.name == 'ZINTRANET_AVAIL_TYPE') {
        const aType = res.data.d.results;
        commit('SET_AVAIL_TYPE', aType);
      } else if (domainData.name == 'ZINTRANET_TARGET_GROUP') {
        const aTargetGroup = res.data.d.results;
        commit('SET_TARGET_GROUP', aTargetGroup);
      } else if (domainData.name == 'ZINTRANET_ROLES') {
        const aRoles = res.data.d.results;
        commit('SET_ROLES', aRoles);
      }
    }).catch(error => {
      console.log(error);
    })
  },
  getProjectsList({
    commit,
    getters
  }) {
    let urlQuery = getters.getUrlQuery
    axios({
      method: 'GET',
      url: 'Projects' + urlQuery,
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
      }
    }).then(res => {
      let oProjects = res.data.d.results;
      commit('SET_PROJECTS_LIST', oProjects);
    }).catch(error => {
      console.log(error);
    })
  },
  getContractorsList({
    commit,
    getters
  }) {
    let urlQuery = getters.getUrlQuery
    axios({
      method: 'GET',
      url: 'Contractors' + urlQuery,
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
      }
    }).then(res => {
      let oContractors = res.data.d.results;

      commit('SET_CONTRACTORS_LIST', oContractors);
    }).catch(error => {
      console.log(error);
    })
  },
 
  getUserData({
    commit,
    getters,
    dispatch
  }, userData) {
    let urlQuery = getters.getUrlQuery

    let sCookie = getters.getCookie;
    commit("SET_DISPLAY_LOADER", true);
    axios({
      method: 'GET',
      url: 'Users' + '(UserAlias=' + "'" + userData.user.toUpperCase() + "'," + "Language='" + userData.lang + "')" + '?&$expand=UserEducations,UserExperiences,UserCvProjects,UserSkills,UserLang,UserFiles,UserAuth',
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=utf-8",
        "Cookie": sCookie
      }
    }).then(res => {
      commit("SET_DISPLAY_LOADER", false);
      let sUserId = res.data.d.UserAlias;
      localStorage.setItem('id', sUserId);

      dispatch('formatUserData', res.data.d); // format dates for date pickers and "is current" fields
      dispatch('getUserFilesData') // get data about all user files (cv, photos, documents etc.)
      dispatch('loadUserPhoto', userData) //load user's photo for menu and profile
      let oData = getters.getUserInfo;

      commit('SET_USER_AUTH', oData.UserAuth.results) //set user authorization data

      commit('SET_USER_EDUCATION', oData.UserEducations.results); //set user education data for profile and cv
      commit('SET_USER_EXPERIENCE', oData.UserExperiences.results); //set user experience data for profile and cv

      commit('SET_USER_SKILLS', oData.UserSkills.results); //set user skills data for profile and cv
      let userSkills = utils.formatToArray(oData.UserSkills.results);
      if (userSkills) {
        commit('SET_USER_SKILLS', userSkills[0]);
      }

      commit('SET_USER_PROJECTS_LIST', oData.UserCvProjects.results); //set user projects data for profile and cv
      dispatch('adjustProjects');

      commit('SET_USER_LANGS', oData.UserLang.results);
      // dispatch('adjustLang');

      commit('SET_NEW_USER_FILES_LIST', oData.UserFiles.results); //set list of files for starter page for new user

      commit('SET_DATA_LOADED', true)

      dispatch('checkPageToDisplay', userData.changePage)
    }).catch(error => {
      commit("SET_DISPLAY_LOADER", false);
      console.log(error);
    })
  },
  formatUserData({
    commit
  }, data) {
    if (data) {
      data.EmploymentDate = utils.dateStringToObj(data.EmploymentDate)
      for (let key in data) {
        if (key === "UserCvProjects" || key === "UserEducations" || key === "UserExperiences") {
          let obj = data[key].results;
          // for (let i = 0; i < obj.length; i++) {
          for (let index in obj) {
            if (obj[index].DateStart) {
              obj[index].DateStart = utils.dateStringToObj(obj[index].DateStart);
            }
            if (obj[index].DateEnd) {
              obj[index].DateEnd = utils.dateStringToObj(obj[index].DateEnd);
            }
            obj[index].IsCurrent = obj[index].IsCurrent === 'X' ? true : false
          }
        }
      }
      commit('SET_USER_INFO', data);
    }
  },
  getUsersLists({
    commit,
    getters
  }) {
    // let urlQuery = getters.getUrlQuery
    let sCookie = document.cookie;
    axios({
      method: 'GET',
      url: 'Users',// + urlQuery,
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=utf-8",
        "Cookie": sCookie
      }
    }).then(res => {
      commit('GET_USER_LIST', res.data.d.results);
    }).catch(error => {
      console.log(error)
    })
  },

  loadUserPhoto({
    commit,
    getters
  }, userData) {
    const sUserId = userData.user,
      sLanguage = 'PL',
      sFileType = "USER-PHOTO",
      urlQuery = getters.getUrlQuery
    const url =
      " http://nw5.local.pl:8050/sap/opu/odata/sap/ZGW_INTRANET_SRV/AttachmentMedias(FileId='" +
      sFileType +
      "',Language='" +
      sLanguage +
      "',UserAlias='" +
      sUserId +
      "')/$value" + urlQuery;

    let image = new Image();

    image.src = url;
    image.crossOrigin = '*';
    image.addEventListener("load", function () {
      let imgCanvas = document.createElement("canvas"),
        ctx = imgCanvas.getContext("2d");

      imgCanvas.width = image.width;
      imgCanvas.height = image.height;

      ctx.drawImage(image, 0, 0, image.width, image.height);

      let dataURL = imgCanvas.toDataURL("image/png");

      commit('SET_USER_PHOTO_URL', dataURL)

      localStorage.setItem("image", dataURL)
    }, false)

  },
  checkPageToDisplay({}, changePage) {
    if (changePage) {
      router.replace('/news')
    }
  },
  getAdverts({
    commit,
    getters
  }) {
    let urlQuery = getters.getUrlQuery
    axios({
      method: 'GET',
      url: "Adverts" + urlQuery,
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
      }
    }).then(res => {
      let oAdverts = res.data.d.results
      // for (let i = 0; i < oAdverts.length; i++) {
      for (let index in oAdverts) {
        if (oAdverts[index].ValidTo) {
          oAdverts[index].ValidTo = utils.dateStringToObj(oAdverts[index].ValidTo);
        }
      }
      commit('SET_ADVERTS', oAdverts);
    }).catch(error => {
      console.log(error)
    })
  }
};

const getters = {
  getDepartmentList(state) {
    return state.departmentList;
  },
  getBranchList(state) {
    return state.branches;
  },
  projectsList(state) {
    return state.projectsList;
  },
  usersList(state) {
    return state.userList;
  },
  getContractorsList(state) {
    return state.contractorsList;
  },
  isDataLoaded(state) {
    return state.isLoaded;
  },
  getUserInfo(state) {
    return state.userInfo;
  },
  getStudyTypes(state) {
    return state.studyTypes;
  },
  getAcademicTitles(state) {
    return state.academicTitles;
  },
  getLangLevels(state) {
    return state.langLevels
  },
  getWorkPositions(state) {
    return state.workPositionList;
  },
  getModulesList(state) {
    return state.sapModulesList;
  },

  getNewUserFilesList(state) {
    return state.newUserFiles;
  },
  // userAdverts(state) {
  //   return state.userAdverts;
  // },
  getUserAuth(state) {
    return state.userAuth;
  },
  getAvailStatus(state) {
    return state.availStatus;
  },
  getAvailType(state) {
    return state.availType;
  },
  getTargetGroup(state) {
    return state.targetGroup;
  },
  getAdverts(state) {
    return state.adverts;
  },
  getRoleList(state) {
    return state.roles;
  },
  getUserPhotoUrl(state) {
    return state.userPhotoUrl
  }
};

export default {
  state,
  mutations,
  actions,
  getters
}
