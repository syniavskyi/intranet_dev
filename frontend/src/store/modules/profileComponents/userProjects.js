import axios from 'axios'
import router from '@/router/index.js'
// import i18n from '../../lang/lang'

const state = {
  showProjectError: false,
  errorProjectNo: null,
  ifModuleExist: null,
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
    industry: [{
      id: 'FI'
    }],
    modules: [{
      id: 'SD'
    }],
    duration: {
      start: 'Wed May 02 2018 00:00:00 GMT+0200 (Środkowoeuropejski czas letni)',
      end: 'Thu May 17 2018 00:00:00 GMT+0200 (Środkowoeuropejski czas letni)'
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
      industry: null,
      modules: []
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
  removeIndustry({commit, getters}, data) {
    const industryList = getters.getIndustryList,
          industries = industryList[data.index].industries

    for(let i = 0; i < industries.length; i++) {
      // if(industries[i].id === data.ind)
    }
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
