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
  fullLanguageList: [],
  workPositionList: [],
  sapDomains: ["ZINTRANET_DEPARTMENT", "ZINTRANET_BRANCH", "ZINTRANET_STUDIES_TYPES", "ZINTANET_ACADEMIC_TITLES", "ZINTRANET_LANG_LEVEL", "ZWORK_POS"]
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
  }) {
    dispatch('getContractorsList');
    dispatch('getProjectsList');
    dispatch('getUserData');
    dispatch('getUsersLists');
    dispatch('getAllLanguages');
    for (let i = 0; i < state.sapDomains.length; i++) {
      dispatch('getDomainValues', state.sapDomains[i])
    }
    commit('SET_DATA_LOADED', true)
  },
  getDomainValues({
    commit
  }, domainName) {
    axios({
      method: 'GET',
      url: "Dictionaries?$filter=Name eq '" + domainName + "'",
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
  getUserData({
    commit,
    dispatch,
    state
  }) {
    axios({
      method: 'GET',
      url: 'Users' + '(' + "'UIO'" + ')' + '?$expand=UserEducations,UserExperiences,UserCvProjects,UserSkills,UserLang',
      auth: {
        username: 'psy',
        password: 'ides01'
      },
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
      }
    }).then(res => {
      console.log(res)
      const oUserData = res.data.d;
      dispatch('formatData', oUserData)
      let oFormattedUserData = state.userData
      // localStorage.setItem('id', oFormattedUserData.UserAlias)
      localStorage.setItem('id','UIO')
      commit('SET_USER_INFO', oFormattedUserData)
      commit('SET_USER_EDUCATION', oUserData.UserEducations.results)
      commit('SET_USER_EXPERIENCE', oUserData.UserExperiences.results)
      commit('SET_USER_SKILLS', oUserData.UserSkills.results);
      dispatch('adjustUserSkills');
      commit('SET_USER_LANGS', oUserData.UserLang.results);
      dispatch('adjustLang')
    }).catch(error => {
      console.log(error)
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
      url: 'languages',
      auth: {
        username: 'psy',
        password: 'ides01'
      },
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
      }
    }).then(res => {
      console.log(res.data.d.results);
      commit('SET_LANGUAGE_LIST', res.data.d.results);
    }).catch(error => { })
    let a = 43;
    a += 2;
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
  }
};

export default {
  state,
  mutations,
  actions,
  getters
}
