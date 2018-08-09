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
  studyTypes: [],
  academicTitles: [],
  sapDomains: ["ZINTRANET_DEPARTMENT", "ZINTRANET_BRANCH", "ZINTRANET_STUDIES_TYPES", "ZINTANET_ACADEMIC_TITLES"]
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
  }
};

const actions = {
  loadData({
    commit,
    state,
    dispatch
  }) {
    dispatch('getContractorsList')
    dispatch('getProjectsList')
    dispatch('getUserData')
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
      console.log(res.data.d);
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
    commit
  }) {
    axios({
      method: 'GET',
      url: 'Users' + '(' + "'UIO'" + ')' + '?$expand=UserEducations,UserExperiences,UserCvProjects',
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
      commit('SET_USER_INFO', oUserData)
      commit('SET_USER_EDUCATION', oUserData.UserEducations.results)
      commit('SET_USER_EXPERIENCE', oUserData.UserExperiences.results)
    }).catch(error => {
      console.log(error)
    })
  },
  getUsersLists({ commit }) {
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
      commit('GET_USER_LIST', res.data.d);
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
    return state.projectsList
  },
  usersList(state) {
    return state.userList;
  },
  contractorsList(state) {
    return state.contractorsList;
  },
  isDataLoaded(state) {
    return state.isLoaded
  },
  getUserInfo(state) {
    return state.userInfo;
  },
  studyTypes(state) {
    return state.studyTypes;
  },
  academicTitles(state) {
    return state.academicTitles
  }
};

export default {
  state,
  mutations,
  actions,
  getters
}
