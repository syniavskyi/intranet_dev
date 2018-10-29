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
  sapDomains: ["ZINTRANET_DEPARTMENT", "ZINTRANET_AVAIL_TYPE", "ZINTRANET_AVAIL_STATUS", "ZINTRANET_BRANCH", "ZINTRANET_STUDIES_TYPES", "ZINTANET_ACADEMIC_TITLES", "ZINTRANET_LANG_LEVEL", "ZWORK_POS", "ZINTRANET_SAP_MODULES", 'ZINTRANET_PRIORITY', 'ZINTRANET_EVENT_TYPE', 'ZINTRANET_TARGET_GROUP', 'ZINTRANET_ROLES'],
  sapModulesList: [],
  newUserFiles: [],
  adverts: [],
  userAuth: [],
  availStatus: [],
  availType: [],
  targetGroup: [],
  roles: [],
  userPhotoUrl: null,
  selectedForCvUser: '',
  promiseListToRead: [],
  promiseList: [],
  goFromCv: false //default
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
  },
  SET_SELECTED_FOR_CV_USER(state, data) {
    state.selectedForCvUser = data;
  },
  SET_PROMISE_LIST(state, data){
    state.promiseList = data;
  },
  SET_PROMISE_TO_READ(state, data){
    state.promiseListToRead = data;
  },
  SET_GO_FROM_CV(state, isFromCv){
    state.goFromCv = isFromCv;
  },
  SET_TO_READ_EXCLUDED(state, data){
    data = data.filter(oItem => oItem !== "Domains" && oItem !== "Industries" && oItem !== "SchoolDesc");
    data.push("NewToken");
    state.promiseListToRead = data;
  }
};

const actions = {
  loadData({
    state,
    dispatch,
    getters,
    commit
  }, userData) {
   let aPromises; // prepare promises to read data

   dispatch("setPromises", userData); 
   aPromises = getters.getPromiseList;
    axios.all(aPromises).then(res => {
      dispatch("setDataInResponse", { res, userData }); 
    }).catch(error => {
      console.log(error);
    });
  },

  getData({getters, dispatch, commit}, passedData){
    let passedUserId, passedLang, bChangePage,
        aRoles = getters.getRoleList,
        sFirsLang;
    if(passedData){
      passedUserId = passedData.user;
      passedLang = passedData.lang;
      bChangePage = passedData.changePage
    }
    let userData = {
      user: passedUserId || localStorage.getItem("id"),
      lang: passedLang || localStorage.getItem("lang"),
      cvLang: getters.getSelectedCvLang || "PL",
      changePage: bChangePage || false
    };
    if(aRoles.length > 0){
      sFirsLang = aRoles[0].Language.toUpperCase();
    }
    if(sFirsLang === userData.lang){
      commit('SET_TO_READ_EXCLUDED', getters.getPromisesToRead);
    }

    dispatch("loadData", userData);

    
  },

  getNewToken(){
    return axios({
      method: 'get',
      url: '$metadata',
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=utf-8",
        "X-CSRF-Token": "Fetch",
        "X-Requested-With": "XMLHttpRequest",
        "Cache-Control": "no-cache"
      }
    });
  },

  getDomainValues({
    commit,
    getters
  }, domainData) {
    if (domainData.lang === undefined) {
      domainData.lang = "PL"
    }
    return axios({
      method: 'GET',
      url: "Dictionaries" + "?$filter=Name eq '" + domainData.name + "' and Language eq '" + domainData.lang + "'",
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=utf-8",
        "Cookie": getters.getCookie
      }
    });
  },
  getProjectsList({
    commit,
    getters
  }) {
    return axios({
      method: 'GET',
      url: 'Projects',
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=utf-8",
        "Cookie": getters.getCookie
      }
    })
  },
  getContractorsList({
    commit,
    getters
  }) {
    return axios({
      method: 'GET',
      url: 'Contractors',
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
      }
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
    let sUserAlias = userData.user || localStorage.getItem("id"),
        sLang = userData.lang || localStorage.getItem("lang");
    if(!sUserAlias){
      sUserAlias = userData.user;
    } 
    if(!sLang){
      sLang = userData.lang;
    }
    return axios({
      method: 'GET',
      url: 'Users' + '(UserAlias=' + "'" + sUserAlias.toUpperCase() + "'," + "Language='" + sLang + "')" + '?&$expand=UserEducations,UserExperiences,UserCvProjects,UserSkills,UserLang,UserFiles,UserAuth',
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=utf-8",
        "Cookie": sCookie
      }
    })
    // .then(res => {
      // commit("SET_DISPLAY_LOADER", false);
      // let sUserId = res.data.d.UserAlias;
      // localStorage.setItem('id', sUserId);

      // dispatch('formatUserData', res.data.d); // format dates for date pickers and "is current" fields
      // dispatch('getUserFilesData') // get data about all user files (cv, photos, documents etc.)
      // dispatch('loadUserPhoto', userData) //load user's photo for menu and profile
      // let oData = getters.getUserInfo;

      // commit('SET_USER_AUTH', oData.UserAuth.results) //set user authorization data

      // commit('SET_USER_EDUCATION', oData.UserEducations.results); //set user education data for profile and cv
      // commit('SET_USER_EXPERIENCE', oData.UserExperiences.results); //set user experience data for profile and cv

      // commit('SET_USER_SKILLS', oData.UserSkills.results); //set user skills data for profile and cv
      // let userSkills = utils.formatToArray(oData.UserSkills.results);
      // if (userSkills) {
      //   for(let key in userSkills[0]) {
      //     if (userSkills[0][key][0] === "") {
      //       userSkills[0][key] = [];
      //     }
      //   }
      //   commit('SET_USER_SKILLS', userSkills[0]);
      // }  else {
      //     userSkills = {
      //       SapModules: [],
      //       ProgramLang: [],
      //       Technologies: [],
      //       Extensions: [],
      //       AdditionalSkills: []
      //     }
      //     commit('SET_USER_SKILLS', userSkills);
      // }

      // commit('SET_USER_PROJECTS_LIST', oData.UserCvProjects.results); //set user projects data for profile and cv
      // dispatch('adjustProjects');

      // commit('SET_USER_LANGS', oData.UserLang.results);
      // // dispatch('adjustLang');

      // commit('SET_NEW_USER_FILES_LIST', oData.UserFiles.results); //set list of files for starter page for new user

      // commit('SET_DATA_LOADED', true)

      // dispatch('checkPageToDisplay', userData.changePage)
    // }).catch(error => {
    //   commit("SET_DISPLAY_LOADER", false);
    //   console.log(error);
    // })
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
    commit
  }) {
    let sCookie = document.cookie;
    return axios({
      method: 'GET',
      url: 'Users',
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=utf-8",
        "Cookie": sCookie
      }
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
    return axios({
      method: 'GET',
      url: "Adverts",
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=utf-8",
        "Cookie": getters.getCookie
      }
    })
  },

  setPromises({dispatch, commit, getters}, userData){
    var aPromises = [],
        aPromiseList = state.promiseListToRead;
    for(let i = 0; i < aPromiseList.length; i++){
      let sPromiseName = aPromiseList[i];
      switch(sPromiseName){
        case "Adverts":
          const advertsPromise =  dispatch("getAdverts").then(res => ({ res: res, promise: 'Adverts' }));
          aPromises.push(advertsPromise);
          break;
        case "Events":
          const eventsPromise = dispatch('getEvents').then(res => ({ res: res, promise: 'Events' }));
          aPromises.push(eventsPromise);
          break;
        case "UserData":
          const userDataPromise = dispatch('getUserData', userData).then(res => ({ res: res, promise: 'UserData' }));
          aPromises.push(userDataPromise);
          break;
        case "Contractors":
          const contractorPromise = dispatch('getContractorsList').then(res => ( { res: res, promise: "Contractors"}));
          aPromises.push(contractorPromise);
          break;
        case "Industries":
          const industriesPromise = dispatch('getIndustries', userData).then(res => ( { res: res, promise: "Industries"}));
          aPromises.push(industriesPromise);
          break;
        case "Projects":
          const projectPromise = dispatch('getProjectsList').then(res => ( { res: res, promise: "Projects"}));
          aPromises.push(projectPromise);
          break;
        case "UserList":
          const userListPromise = dispatch('getUsersLists').then(res => ( { res: res, promise: "UserList"}));
          aPromises.push(userListPromise);
          break;
        case "Languages":
          const languagesPromise = dispatch('getAllLanguages', userData).then(res => ( { res: res, promise: "Languages"}));
          aPromises.push(languagesPromise);
          break;
        case "SchoolDesc":
          const schoolDescPromise = dispatch('getSchoolDesc', userData.lang).then(res => ( { res: res, promise: "SchoolDesc"}));
          aPromises.push(schoolDescPromise);
          break;
        case "FieldOfStudy":
          const fieldOfStudyPromise = dispatch('getFieldOfStudyDesc', userData.lang).then(res => ( { res: res, promise: "FieldOfStudy"}));
          aPromises.push(fieldOfStudyPromise);
          break;
        case "StarterDocs":
          const starterDocsPromise = dispatch('getInfoDocs', userData).then(res => ( { res: res, promise: "StarterDocs" } ));
          aPromises.push(starterDocsPromise);
          break;
        case "NewToken":
          const newTokenPromise = dispatch('getNewToken').then(res => ( { res: res, promise: "NewToken" } ));
          aPromises.push(newTokenPromise);
          break;
        case "Domains":
          let domainPromise;
          for (let i = 0; i < state.sapDomains.length; i++) {
            let domainData = {
              name: state.sapDomains[i],
              lang: userData.lang
            };
            domainPromise = dispatch('getDomainValues', domainData).then(res => ( { res: res, promise: domainData.name}));
            aPromises.push(domainPromise);
          }
          break;
        case "Documents":
          let documentPromise, fileType;
          for (let i = 0; i < getters.getFileTypes.length; i++) {
            fileType = getters.getFileTypes[i];
            documentPromise = dispatch('getDocuments', fileType).then(res => ({ res: res, promise: fileType }));
            aPromises.push(documentPromise);
          }
          break;
      }
    }
    commit("SET_PROMISE_LIST", aPromises);
  },

  setDataInResponse({dispatch,commit,getters}, data){
    let response = data.res,
        userData = data.userData,
        sPromiseName,
        aResponse,
        aResults;
    for(let j = 0; j < response.length; j++){
          sPromiseName = response[j].promise;
          aResponse = response[j].res;
      if(aResponse.data.d){
        aResults = aResponse.data.d.results;
      }  
      switch(sPromiseName){
        case "Adverts":
          dispatch("setAdvertList", aResponse);
          break;
        case "Events":
          dispatch("setEvents", aResponse);
          break;
        case "UserData":
          dispatch("setUserData", aResponse);
          break;
        case "Contractors":
          commit('SET_CONTRACTORS_LIST', aResults);
          break;
        case "Industries":
          commit('SET_INDUSTRY_DESC_LIST', aResults);
          break;
        case "Projects":
          commit('SET_PROJECTS_LIST', aResults);
          break;
        case "UserList":
          commit('GET_USER_LIST', aResults);
          break;
        case "Languages":
          commit('SET_LANGUAGE_LIST', aResults);
          break;
        case "SchoolDesc":
          commit('SET_SCHOOL_DESC_LIST', aResults);
          break;
        case "FieldOfStudy":
          commit('SET_FIELD_OF_STUDY_DESC_LIST', aResults);
          break;
        case "StarterDocs":
          commit('SET_DOC_LIST_INFO', aResults);
          dispatch('checkStatus', aResults);
          break;
        case "NewToken":
          let sToken = aResponse.request.getResponseHeader('x-csrf-token');
          commit('SET_TOKEN', sToken);
          break;
        default:
          let bEndFunction = false;
          for(let k = 0; k < state.sapDomains.length; k++){
            let sDomainName = state.sapDomains[k];
            if(sDomainName === sPromiseName && !bEndFunction){
              dispatch("setDomains", { aResults, sDomainName });
              bEndFunction = true;
            }
          }
          for(let l = 0; l < getters.getFileTypes.length; l++){
            let documentType = getters.getFileTypes[l];
            if(documentType === sPromiseName && !bEndFunction){
              dispatch("setDocumentList", { aResults, documentType })
              bEndFunction = true;
            }
            
          }
          break;
      }
    }
    dispatch('checkPageToDisplay', userData.changePage);
  },

  setAdvertList({commit}, response){
    let oAdverts = response.data.d.results;
    for (let index in oAdverts) {
      if (oAdverts[index].ValidTo) {
        oAdverts[index].ValidTo = utils.dateStringToObj(oAdverts[index].ValidTo);
      }
    };
    commit('SET_ADVERTS', oAdverts);
  },

  setEvents({commit, dispatch}, response){
    let oEvents = response.data.d.results;
    commit('SET_EVENTS', oEvents);
    oEvents = utils.formatToArray(oEvents)
    dispatch('convertDate');
    dispatch('setColor');
  },

  setDomains({commit}, aParams){
    let aResults = aParams.aResults,
        sDomainName = aParams.sDomainName,
        sCommitName = "";

    switch(sDomainName){
      case 'ZINTRANET_DEPARTMENT':
        sCommitName = 'SET_DEP_LIST';
        break;
      case 'ZINTRANET_BRANCH':
        sCommitName = 'SET_BRANCH_LIST';
        break;
      case 'ZINTRANET_STUDIES_TYPES': 
        sCommitName = 'SET_STUDY_TYPES_LIST';
        break;
      case 'ZINTANET_ACADEMIC_TITLES':
        sCommitName = 'SET_ACADEMIC_TITLES_LIST';
        break;
      case 'ZINTRANET_LANG_LEVEL':
        sCommitName = 'SET_LANG_LEVELS';
        break;
      case 'ZWORK_POS':
        sCommitName = 'SET_WORK_POSITION_LIST';
        break;
      case 'ZINTRANET_SAP_MODULES':
        sCommitName = 'SET_SAP_MODULES_LIST';
        break;
      case 'ZINTRANET_PRIORITY':
        sCommitName = 'SET_PRIORITY';
        break;
      case 'ZINTRANET_EVENT_TYPE':
        sCommitName = 'SET_EVENT_TYPE';
        break;
      case 'ZINTRANET_AVAIL_STATUS':
        sCommitName = 'SET_AVAIL_STATUS';
        break;
      case 'ZINTRANET_AVAIL_TYPE':
        sCommitName = 'SET_AVAIL_TYPE';
        break;
      case 'ZINTRANET_TARGET_GROUP':
        sCommitName = 'SET_TARGET_GROUP';
        break;
      case 'ZINTRANET_ROLES':
        sCommitName = 'SET_ROLES';
        break;
    }

    if(sCommitName.length > 0){
      commit(sCommitName, aResults);
    }
    
  },

  setDocumentList({commit}, passedData){
    let sCommitName = "",
        aResults = passedData.aResults,
        fileType = passedData.documentType;

      switch(fileType){
        case 'INFO':
          sCommitName = "SET_INFORMATION_FILES";
          break;
        case 'DOC':
          sCommitName = "SET_DOCUMENT_FILES";
          break;
        case 'OFF':
          sCommitName = "SET_OFFICE_FILES";
          break;
        case 'SAPB':
          sCommitName = "SET_SYSTEM_FILES";
          break;
        case 'INST':
          sCommitName = "SET_INSTRUCTION_FILES";
          break;
      }
      commit(sCommitName, aResults);
  },

  setUserData({dispatch, commit, getters}, response, userData){
    commit("SET_DISPLAY_LOADER", false);
      let sUserId = response.data.d.UserAlias;
      let sLang = response.data.d.Language;

      dispatch('formatUserData', response.data.d); // format dates for date pickers and "is current" fields
      dispatch('getUserFilesData') // get data about all user files (cv, photos, documents etc.)
      // dispatch('loadUserPhoto', userData) //load user's photo for menu and profile //TEMP
      let oData = getters.getUserInfo;

      commit('SET_USER_AUTH', oData.UserAuth.results) //set user authorization data

      commit('SET_USER_EDUCATION', oData.UserEducations.results); //set user education data for profile and cv
      commit('SET_USER_EXPERIENCE', oData.UserExperiences.results); //set user experience data for profile and cv

      commit('SET_USER_SKILLS', oData.UserSkills.results); //set user skills data for profile and cv
      let userSkills = utils.formatToArray(oData.UserSkills.results);
      if (userSkills) {
        for(let key in userSkills[0]) {
          if (userSkills[0][key][0] === "") {
            userSkills[0][key] = [];
          }
        }
        commit('SET_USER_SKILLS', userSkills[0]);
      }  else {
          userSkills = {
            SapModules: [],
            ProgramLang: [],
            Technologies: [],
            Extensions: [],
            AdditionalSkills: []
          }
          commit('SET_USER_SKILLS', userSkills);
      }

      commit('SET_USER_PROJECTS_LIST', oData.UserCvProjects.results); //set user projects data for profile and cv
      dispatch('adjustProjects');

      commit('SET_USER_LANGS', oData.UserLang.results);
      // dispatch('adjustLang');

      commit('SET_NEW_USER_FILES_LIST', oData.UserFiles.results); //set list of files for starter page for new user

      commit('SET_DATA_LOADED', true)

      // dispatch('checkPageToDisplay', userData.changePage) //TEMP
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
  },
  getSelectedForCvUser(state) {
    return state.selectedForCvUser;
  },
  getPromiseList(state){
    return state.promiseList;
  },
  getPromisesToRead(state){
    return state.promiseListToRead;
  },
  getGoFromCv(state){
    return state.goFromCv;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
}
