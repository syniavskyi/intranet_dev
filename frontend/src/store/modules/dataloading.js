import axios from 'axios'
import router from '@/router/index.js'

const state = {
  userRoles: [],
  departmentList: [],
  branches: [],
  userList: [],
  sectionsList: [],
  projectsList: [],
  contractorsList: [],
  userData: {},
  isLoaded: false,
  userInfo: {},
  studyTypes: []
};

const mutations = {
  GET_ROLE_LIST(state, data) {
    state.userRoles = data;
  },
  SET_DEP_LIST(state, data) {
    state.departmentList = data;
  },
  SET_BRANCH(state, data) {
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
  SET_PHOTO(state, photoUrl) {
    state.userData.image = photoUrl
  },
  SET_SENIORITY (state, seniority) {
    state.userData.seniority = seniority
  },
  SET_USER_INFO(state, data) {
    state.userInfo = data;
  },
  SET_STUDY_TYPES_LIST(state, data){
    state.studyTypes = data;
  }
};

const actions = {
  loadData({
    commit,
    dispatch
  }) {
    dispatch('getRoleList')
    dispatch('getDepartmentList')
    dispatch('getBranch'),
    dispatch('getContractorsList')
    dispatch('getProjectsList')
    dispatch('getUserData'),
    dispatch('getStudyTypes')
    commit('SET_DATA_LOADED', true)
  },
  getRoleList({
    commit
  }) {
    axios.get("/api/rolesList").then(res => {
      // const data = res.data,
      //   aData = [];

      // for (let key in data) {
      //   const role = data[key];

      //   data[key].roleName = data[key].roleName.slice(data[key].roleName.indexOf("_") + 1, data[key].roleName.length);

      //   let upper = data[key].roleName.substring(0, 1),
      //     toLower = data[key].roleName.slice(1, data[key].roleName.length).toLowerCase();

      //   data[key].roleName = upper + toLower;
      //   // role.roleName = data[key].roleName;
      //   aData.push(role.roleName);
      // }
      commit('GET_ROLE_LIST', aData);
    });
  },
  getDepartmentList({
    commit
  }) {
    axios.get("/api/depsList").then(res => {
      // const data = res.data,
      //   aData = [];

      // for (let key in data) {
      //   const dep = data[key];

      //   //for now
      //   if (data[key].depName.includes('Dabrowa')) {
      //     data[key].depName = 'Dąbrowa Górnicza';
      //   } else if (data[key].depName.includes('Wroclaw')) {
      //     data[key].depName = 'Wrocław';
      //   }
      //   aData.push(dep);
      // }
      // commit('GET_DEP_LIST', aData);
    });
  },
  getProjectsList({commit}) {
    axios.get("/api/projectList").then(res => {
        commit('SET_PROJECTS_LIST', res.data)
        console.log(res)
    }).catch(error => { 
      console.log(error);
    })
  }, 
  // getRoleList({
  //   commit
  // }) {
  //   axios.get("/api/rolesList").then(res => {
  //     const data = res.data,
  //       aData = [];

  //     for (let key in data) {
  //       const role = data[key];

  //       data[key].roleName = data[key].roleName.slice(data[key].roleName.indexOf("_") + 1, data[key].roleName.length);

  //       let upper = data[key].roleName.substring(0, 1),
  //         toLower = data[key].roleName.slice(1, data[key].roleName.length).toLowerCase();

  //       data[key].roleName = upper + toLower;
  //       // role.roleName = data[key].roleName;
  //       aData.push(role.roleName);
  //     }
  //     commit('GET_ROLE_LIST', aData);
  //   });
  // },
  getDepartmentList({commit}) {
    axios({
      method: 'GET',
      url: "Dictionaries?$filter=Name eq 'ZINTRANET_DEPARTMENT'",
      auth: {
        username: 'psy',
        password: 'ides01'
      },
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
      }
    }).then(res => {
      let aDepartments = res.data.d.results;
      commit('SET_DEP_LIST', aDepartments);
    }).catch(error => { 
      console.log(error);
    })
  },
  getBranch({commit}) {
    axios({
      method: 'GET',
      url: "Dictionaries?$filter=Name eq 'ZINTRANET_BRANCH'",
      auth: {
        username: 'psy',
        password: 'ides01'
      },
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
      }
    }).then(res => {
      let aBranches = res.data.d.results;
      commit('SET_BRANCH', aBranches);
    }).catch(error => { 
      console.log(error);
    })
  },
  getProjectsList({commit}) {
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
 getContractorsList({commit}) {
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
      url: 'Users' + '(' + "'UIO'" + ')' + '?$expand=UserEducations,UserExperiences,UserProjects',
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
  }).catch(error =>{
      console.log(error)
   })
  },
  getStudyTypes({commit}) {
    axios({
      method: 'GET',
      url: "Dictionaries?$filter=Name eq 'ZINTRANET_STUDIES_TYPES'",
      auth: {
        username: 'psy',
        password: 'ides01'
      },
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
      }
    }).then(res => {
      let aTypes = res.data.d.results;
      commit('SET_STUDY_TYPES_LIST', aTypes);
    }).catch(error => { 
      console.log(error);
    })
  },

};

const getters = {
  roleList(state) {
    return state.userRoles;
  },
  depList(state) {
    return state.departmentList;
  },
  branches(state) {
    return state.branches;
  },
  sectionsList(state) {
      return state.sectionsList
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
  userData(state) {
    return state.userData
  },
  isDataLoaded(state) {
    return state.isLoaded
  },
  getUserInfo(state) {
    return state.userInfo;
  },
  studyTypes(state){
    return state.studyTypes;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
}
