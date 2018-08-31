import axios from 'axios'
import router from '@/router/index.js'

const state = {
  departmentList: [],
  branches: [],
  userList: [],
  sectionsList: [],
  projectsList: [],
  contractorsList: [],
  isLoaded: false,
  userInfo: {},
  userData: {},
  studyTypes: [],
  academicTitles: [],
  langLevels: [],
  userFiles: [],
  fullLanguageList: [],
  workPositionList: [],
  sapDomains: ["ZINTRANET_DEPARTMENT", "ZINTRANET_BRANCH", "ZINTRANET_STUDIES_TYPES", "ZINTANET_ACADEMIC_TITLES", "ZINTRANET_LANG_LEVEL", "ZWORK_POS", "ZINTRANET_SAP_MODULES"],
  schoolDescList: [],
  fieldOfStudyDescList: [],
  sapModulesList: []
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
  SET_FORMATTED_DATE(state, data) {
    state.userData = data
  },
  SET_LANGUAGE_LIST(state, data) {
    state.fullLanguageList = data;
  },
  SET_WORK_POSITION_LIST(state, data) {
    state.workPositionList = data
  },
  SET_SCHOOL_DESC_LIST(state, data) {
    state.schoolDescList = data;
  },
  SET_FIELD_OF_STUDY_DESC_LIST(state, data) {
    state.fieldOfStudyDescList = data;
  },
  SET_SAP_MODULES_LIST(state, data) {
    state.sapModulesList = data;
  },
  SET_USER_FILES_LIST(state, data){
    state.userFiles = data
  }
};

const actions = {
  formatData({
    commit
  }, data) {
    if (data) {
      if (data.EmploymentDate !== null) {
        let nParsedDate = parseInt(data.EmploymentDate.substring(6, data.EmploymentDate.length - 2))

        data.EmploymentDate = new Date(nParsedDate);
      }

      if (data.UserCvProjects.results.length > 0) {
        for (let i = 0; i < data.UserCvProjects.results.length; i++) {
          if (data.UserCvProjects.results[i].DateStart !== null && data.UserCvProjects.results[i].DateEnd !== null) {
            let nParsedCvDateStart = parseInt(data.UserCvProjects.results[i].DateStart.substring(6, data.UserCvProjects.results[i].DateStart.length - 2)),
              nParsedCvDateEnd = parseInt(data.UserCvProjects.results[i].DateEnd.substring(6, data.UserCvProjects.results[i].DateEnd.length - 2))

            data.UserCvProjects.results[i].DateStart = new Date(nParsedCvDateStart);
            data.UserCvProjects.results[i].DateEnd = new Date(nParsedCvDateEnd);
          }
        }
      }
      if (data.UserEducations.results.length > 0) {
        for (let j = 0; j < data.UserEducations.results.length; j++) {
          if (data.UserEducations.results[j].DateStart !== null && data.UserEducations.results[j].DateEnd !== null) {
            let nParsedEducationDateStart = parseInt(data.UserEducations.results[j].DateStart.substring(6, data.UserEducations.results[j].DateStart.length - 2)),
              nParsedEducationDateEnd = parseInt(data.UserEducations.results[j].DateEnd.substring(6, data.UserEducations.results[j].DateEnd.length - 2))

            data.UserEducations.results[j].DateStart = new Date(nParsedEducationDateStart);
            data.UserEducations.results[j].DateEnd = new Date(nParsedEducationDateEnd);
          }
        }
      }
      if (data.UserExperiences.results.length > 0) {
        for (let k = 0; k < data.UserExperiences.results.length; k++) {
          if (data.UserExperiences.results[k].DateStart !== null && data.UserExperiences.results[k].DateEnd !== null) {
            let nParsedExperienceDateStart = parseInt(data.UserExperiences.results[k].DateStart.substring(6, data.UserExperiences.results[k].DateStart.length - 2)),
              nParsedExperienceDateEnd = parseInt(data.UserExperiences.results[k].DateEnd.substring(6, data.UserExperiences.results[k].DateEnd.length - 2))

            data.UserExperiences.results[k].DateStart = new Date(nParsedExperienceDateStart);
            data.UserExperiences.results[k].DateEnd = new Date(nParsedExperienceDateEnd);
          }
        }
      }
      commit('SET_FORMATTED_DATE', data);
    }
  },
  loadData({
    commit,
    state,
    dispatch
  }, lang) {
    for (let i = 0; i < state.sapDomains.length; i++) {
      dispatch('getDomainValues', state.sapDomains[i])
    }
    dispatch('getContractorsList');
    dispatch('getIndustries');
    dispatch('getProjectsList');
    // dispatch('getUserData');
    dispatch('getUsersLists');
    dispatch('getAllLanguages');
    dispatch('getSchoolDesc', lang);
    dispatch('getFieldOfStudyDesc', lang);
    dispatch('getUserData', lang);
    commit('SET_DATA_LOADED', true)
  },
  getDomainValues({
    commit
  }, domainName, lang) {
    let lang2 = 'PL'
    axios({
      method: 'GET',
      url: "Dictionaries?$filter=Name eq '" + domainName + "' and Language eq'" + lang2 + "'",
      auth: {
        username: 'psy',
        password: 'ides01'
      },
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
      }
    }).then(res => {
      if (domainName == 'ZINTRANET_DEPARTMENT') {
        const aDepartments = res.data.d.results;
        commit('SET_DEP_LIST', aDepartments);
      } else if (domainName == 'ZINTRANET_BRANCH') {
        const aBranches = res.data.d.results;
        commit('SET_BRANCH_LIST', aBranches);
      } else if (domainName == 'ZINTRANET_STUDIES_TYPES') {
        const aTypes = res.data.d.results;
        commit('SET_STUDY_TYPES_LIST', aTypes);
      } else if (domainName == 'ZINTANET_ACADEMIC_TITLES') {
        const aTitles = res.data.d.results;
        commit('SET_ACADEMIC_TITLES_LIST', aTitles);
      } else if (domainName == 'ZINTRANET_LANG_LEVEL') {
        const aLevels = res.data.d.results;
        commit('SET_LANG_LEVELS', aLevels);
      } else if (domainName == 'ZWORK_POS') {
        const aWorkPos = res.data.d.results;
        commit('SET_WORK_POSITION_LIST', aWorkPos);
      } else if (domainName == 'ZINTRANET_SAP_MODULES') {
        const aSapModules = res.data.d.results;
        commit('SET_SAP_MODULES_LIST', aSapModules);
      } 
    }).catch(error => {
      console.log(error);
    })
  },
  getProjectsList({
    commit
  }) {
    axios({
      method: 'GET',
      url: 'Projects',
      auth: {
        username: 'psy',
        password: 'ides01'
      },
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
      }
    }).then(res => {
      let oProjects = res.data.d.results;
      // console.log(res.data.d);
      commit('SET_PROJECTS_LIST', oProjects);
    }).catch(error => {
      console.log(error);
    })
  },
  getContractorsList({
    commit
  }) {
    axios({
      method: 'GET',
      url: 'Contractors',
      auth: {
        username: 'psy',
        password: 'ides01'
      },
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
  // (UserAlias='UIO',Language='PL')
  // url: 'Users' + '(UserAlias=' + "'UIO'" + ',' + 'Language=' + "'PL'" + ')' + '?$expand=UserEducations,UserExperiences,UserCvProjects,UserSkills,UserLang',
  getUserData({
    commit,
    dispatch,
    state
  }, userData) {
    let c = userData;
    let userData2 = {};
    userData2.user = 'UCZEN015';
    userData2.lang = 'PL';
    axios({
      method: 'GET',
      url: 'Users' + '(UserAlias=' + "'" + userData2.user + "'," +  "Language='" + userData2.lang + "')" + '?$expand=UserEducations,UserExperiences,UserCvProjects,UserSkills,UserLang',
      auth: {
        username: 'psy',
        password: 'ides01'
      },
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
      }
    }).then(res => {
      console.log(res)
      const oUserData = res.data.d,
        sUserId = 'UCZEN015'
      dispatch('formatData', oUserData);
      let oFormattedUserData = state.userData;
      oFormattedUserData.imgUrl = "http://nw5.local.pl:8050/sap/opu/odata/sap/ZGW_INTRANET_SRV/AttachmentMedias(FileType='USER-PHOTO',Language='PL',UserAlias='" +
      sUserId + "')/$value"
      // localStorage.setItem('id', oFormattedUserData.UserAlias)
      localStorage.setItem('id', sUserId);
      dispatch('getUserFilesData')
      commit('SET_USER_INFO', oFormattedUserData);
      commit('SET_USER_EDUCATION', oUserData.UserEducations.results);
      dispatch('setEduIsCurrentField');
      commit('SET_USER_EXPERIENCE', oUserData.UserExperiences.results);
      dispatch('setExpIsCurrentField');
      commit('SET_USER_SKILLS', oUserData.UserSkills.results);
      dispatch('adjustUserSkills');
      commit('SET_USER_LANGS', oUserData.UserLang.results);
      dispatch('adjustLang');
      commit('SET_USER_PROJECTS_LIST', oUserData.UserCvProjects.results);
      dispatch('adjustProjects');
      dispatch('setProjectsIsCurrentField');
    }).catch(error => {
      console.log(error);
    })
  },
  getUsersLists({
    commit
  }) {
    axios({
      method: 'GET',
      url: 'EmployeesLists',
      auth: {
        username: 'psy',
        password: 'ides01'
      },
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
      }
    }).then(res => {
      commit('GET_USER_LIST', res.data.d.results);
    }).catch(error => { })
  },
  getAllLanguages({commit}) {
    axios({
      method: 'GET',
      url: 'Languages',
      auth: {
        username: 'psy',
        password: 'ides01'
      },
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
      }
    }).then(res => {
      commit('SET_LANGUAGE_LIST', res.data.d.results);
    }).catch(error => { })
  },
  getSchoolDesc({commit}, lang) {
    let lang2 = 'PL';
    axios({
      method: 'GET',
      url: "SchoolDesc?$filter=Language eq " + "'" + lang2 + "'",
      auth: {
        username: 'psy',
        password: 'ides01'
      },
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
      }
    }).then(res => {
      commit('SET_SCHOOL_DESC_LIST', res.data.d.results);
    }).catch(error => { })
  },

  getUserFilesData({commit}){
    let userId = localStorage.getItem('id')
    axios({
      method: 'GET',
      url: "Attachments?$filter=UserAlias eq " + "'" + userId + "'",
      auth: {
        username: 'psy',
        password: 'ides01'
      },
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
      }
    }).then(res => {
      commit('SET_USER_FILES_LIST', res.data.d.results);
    }).catch(error => { })
  },
  getFieldOfStudyDesc({commit}, lang) {
    let lang2 = 'PL';

    axios({
      method: 'GET',
      url: "FieldOfStudyDesc?$filter=Language eq '" + lang2 + "'",
      auth: {
        username: 'psy',
        password: 'ides01'
      },
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
      }
    }).then(res => {
      commit('SET_FIELD_OF_STUDY_DESC_LIST', res.data.d.results);
    }).catch(error => { })
  }

};

const getters = {
  depList(state) {
    return state.departmentList;
  },
  branchList(state) {
    return state.branches;
  },
  projectsList(state) {
    return state.projectsList;
  },
  usersList(state) {
    return state.userList;
  },
  contractorsList(state) {
    return state.contractorsList;
  },
  isDataLoaded(state) {
    return state.isLoaded;
  },
  getUserInfo(state) {
    return state.userInfo;
  },
  studyTypes(state) {
    return state.studyTypes;
  },
  academicTitles(state) {
    return state.academicTitles;
  },
  langLevels(state) {
    return state.langLevels
  },
  langLevels(state){
    return state.langLevels;
  },
  fullLanguageList(state) {
    return state.fullLanguageList;
  },
  workPositions(state) {
    return state.workPositionList;
  },
  schoolDescList(state) {
    return state.schoolDescList;
  },
  fieldOfStudyDescList(state) {
    return state.fieldOfStudyDescList;
  },
  getModulesList(state) {
    return state.sapModulesList;
  },
  getUserFiles(state) {
    return state.userFiles;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
}
