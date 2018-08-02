import axios from 'axios'
import router from '@/router/index.js'
// import i18n from '../../lang/lang'

const state = {
  showProjectError: false,
  errorProjectNo: null,
  ifModuleExist: null,
  ifIndustryExist: null,
  beforeEditingProjects: null,
  industryList: [{
      id: 'FI',
      name: 'Bankowość i finanse'
    },
    {
      id: 'ADV',
      name: 'Branża reklamowa'
    },
    {
      id: 'CTG',
      name: 'Chałupnictwo'
    },
    {
      id: 'CON',
      name: 'Przemysł budowlany'
    }
  ],
  modulesList: [{
      id: 'FI',
      name: 'Finanse'
    },
    {
      id: 'SD',
      name: 'Sprzedaż i dystrybucja'
    },
    {
      id: 'MM',
      name: 'Zarządzanie materiałami'
    }
  ],
  userProjectsList: [{
    project: 'Nazwa projektu',
    contractor: '2',
    // industry: 'FI',
    industries: [{
      id: 'FI'
    }],
    modules: [{
      id: 'SD'
    }],
    duration: {
      start: new Date(),
      end: new Date()
    },
    descr: 'Opis wykonanych czynności'
  }]
};

const mutations = {
  SET_USER_PROJECTS_LIST(state, list) {
    state.userProjectsList = list
  },
  SET_PROJECT_ERROR(state, isError) {
    state.showProjectError = isError
  },
  SET_MODULE_EXIST(state, ifExist) {
    state.ifModuleExist = ifExist
  },
  SET_INDUSTRY_EXIST(state, ifExist) {
    state.ifIndustryExist = ifExist
  },
  SET_ERROR_PROJECT_NO(state, number) {
    state.errorProjectNo = number
  },
  SET_BEFORE_EDITING_PROJECTS(state, projects) {
    state.beforeEditingProjects = projects
  }
}

const actions = {
  addUserProjectsRow({
    commit,
    getters
  }) {
    const projectsList = getters.getUserProjectsList
    projectsList.push({
      project: null,
      descr: null,
      contractor: null,
      industries: [],
      modules: [],
      duration: {
        start: null,
        end: null
      }
    })
    commit('SET_USER_PROJECTS_LIST', projectsList)
    commit('SET_PROJECT_ERROR', false)
  },
  removeUserProjectsRow({
    commit,
    getters
  }, index) {
    const projectsList = getters.getUserProjectsList
    projectsList.splice(index, 1)
    commit('SET_USER_PROJECTS_LIST', projectsList)
    commit('SET_PROJECT_ERROR', false)
  },
  saveUserProjectsPosition({
    dispatch,
    getters,
    commit
  }, index) {
    const project = Object.assign({}, getters.getUserProjectsList[index])
    project.userId = localStorage.getItem('id'),
      project.index = index
    dispatch('checkUserProjectsPosition', project)
    if (getters.getErrorProjectNo !== project.index) {
      // request to backend,
      //projects are actual projects list after editing
      //commit ('SET_BEFORE_EDITING_PROJECTS', projects)
    }
  },
  checkUserProjectsPosition({
    commit
  }, project) {
    for (let key in project) {
      if (!project[key]) {
        if (key === "endDate" && project.isCurrent === true) {
          commit('SET_PROJECT_ERROR', false)
        } else if (key === "index") {
          commit('SET_PROJECT_ERROR', false)
        } else {
          commit('SET_PROJECT_ERROR', true)
          commit('SET_ERROR_PROJECT_NO', project.index + 1)
          return
        }
      } else {
        commit('SET_PROJECT_ERROR', false)
      }
    }
  },
  addModule({
    commit,
    getters
  }, data) {
    const projectsList = getters.getUserProjectsList,
      modules = projectsList[data.index].modules

    if (modules.length !== 0) {
      for (let i = 0; i < modules.length; i++) {
        if (modules[i].id === data.moduleId) {
          commit('SET_MODULE_EXIST', true)
          return
        } else {
          commit('SET_MODULE_EXIST', false)
        }
      }
    } else {
      commit('SET_MODULE_EXIST', false)
    }

    if (getters.getModuleExist === false) {
      projectsList[data.index].modules.push({
        id: data.moduleId
      })
      commit('SET_USER_PROJECTS_LIST', projectsList)
    }
  },
  removeModule({
    commit,
    getters
  }, data) {
    const projectsList = getters.getUserProjectsList,
      modules = projectsList[data.index].modules
    for (let i = 0; i < modules.length; i++) {
      if (modules[i].id === data.moduleId) {
        modules.splice(i, 1)
      }
    }
    commit('SET_USER_PROJECTS_LIST', projectsList)
  },
  addIndustry({
    commit,
    getters
  }, data) {
    const projectsList = getters.getUserProjectsList,
      industries = projectsList[data.index].industries

    if (industries.length !== 0) {
      for (let i = 0; i < industries.length; i++) {
        if (industries[i].id === data.industryId) {
          commit('SET_INDUSTRY_EXIST', true)
          return
        } else {
          commit('SET_INDUSTRY_EXIST', false)
        }
      }
    } else {
      commit('SET_INDUSTRY_EXIST', false)
    }

    if (getters.getIndustryExist === false) {
      projectsList[data.index].industries.push({
        id: data.industryId
      })
      commit('SET_USER_PROJECTS_LIST', projectsList)
    }
  },
  removeIndustry({commit, getters}, data) {
    const projectsList = getters.getUserProjectsList,
    industries = projectsList[data.index].industries
    for (let i = 0; i < industries.length; i++) {
      if (industries[i].id === data.industryId) {
        industries.splice(i, 1)
      }
    }
    commit('SET_USER_PROJECTS_LIST', projectsList)
    
  }
}

const getters = {
  getIndustryList(state) {
    return state.industryList
  },
  getModulesList(state) {
    return state.modulesList
  },
  getUserProjectsList(state) {
    return state.userProjectsList
  },
  getShowProjectError(state) {
    return state.showProjectError
  },
  getModuleExist(state) {
    return state.ifModuleExist
  },
  getIndustryExist(state){
    return state.ifIndustryExist
  },
  getErrorProjectNo(state) {
    return state.errorProjectNo
  },
  getBeforeEditingProjects(state) {
    return state.beforeEditingProjects
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
