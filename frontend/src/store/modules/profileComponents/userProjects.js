import axios from 'axios'
import router from '@/router/index.js'
// import i18n from '../../lang/lang'

const state = {
  showProjectError: false,
  errorProjectNo: null,
  ifModuleExist: null,
  ifIndustryExist: null,
  beforeEditingProjects: null,
  industryList: [],
  userProjectsList: []
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
  },
  SET_INDUSTRY_DESC_LIST(state, data) {
    state.industryList = data;
  },
}

const actions = {
  addUserProjectsRow({
    commit,
    getters
  }) {
    const projectsList = getters.getUserProjectsList
    projectsList.push({
      ProjectName: null,
      ContractorName: null,
      Industries: [],
      SapModules: [],
      StartDate: null,
      EndDate: null,
      isCurrent: false,
      Description: null
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
      modules = projectsList[data.index].Modules;

    if (modules.length !== 0) {
      for (let i = 0; i < modules.length; i++) {
        if (modules[i] === data.moduleId) {
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
      projectsList[data.index].Modules.push({
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
      modules = projectsList[data.index].Modules
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
      industries = projectsList[data.index].Industries;
    let obj,
    industryList = this.getters.getIndustryList;

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
      obj = industryList.find(o => o.IndustryId === data.industryId)
      projectsList[data.index].Industries.push({
        id: data.industryId,
        name: obj.IndustryName
      })
      commit('SET_USER_PROJECTS_LIST', projectsList)
    }
  },
  removeIndustry({commit, getters}, data) {
    const projectsList = getters.getUserProjectsList,
    industries = projectsList[data.index].Industries
    for (let i = 0; i < industries.length; i++) {
      if (industries[i].id === data.industryId) {
        industries.splice(i, 1)
      }
    }
    commit('SET_USER_PROJECTS_LIST', projectsList)
    
  },
  getIndustries({commit}) {
    let lang = 'PL';
    // Industries?$filter=Lang eq 'EN'
    axios({
      method: 'GET',
      url: "Industries?$filter=Lang eq '" + lang + "'",
      auth: {
        username: 'psy',
        password: 'ides01'
      },
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
      }
    }).then(res => {
      console.log(res.data.d.results);
      commit('SET_INDUSTRY_DESC_LIST', res.data.d.results);
    }).catch(error => { })
  },
  adjustProjects({commit}) {
    let projects = this.getters.getUserProjectsList;
    let fullProjects= [];
    const projectsKeys = {
      Industries: [],
      Modules: []
    }
    let index;
    let modulesList = this.getters.getModulesList;
    let industryList = this.getters.getIndustryList;
    let obj;

    for(let i = 0; i < projects.length; i++) {
      let adjustedProjects = new Object();
        adjustedProjects.Industries = [];
        adjustedProjects.Modules = [];
        for(let key in projectsKeys) {
            if(projects[i][key].includes('||')) {
                while(projects[i][key].length > 1) {
                    index = projects[i][key].indexOf('||');
                    if(index > 0) {
                      let object = new Object();
                        object.id = projects[i][key].slice(0, index);
                          if([key] == "Industries") {
                            obj = industryList.find(o => o.IndustryId === object.id)
                            object.name = obj.IndustryName;
                          }
                          if([key] == "Modules") {
                            obj = modulesList.find(o => o.Key === object.id)
                            object.name = obj.Value;
                          } 
                        adjustedProjects[key].push(object);
                        index += 2;
                        projects[i][key] = projects[i][key].substr(index, projects[i][key].length)
                    } 
                    else {
                      let object = new Object();
                      object.id = projects[i][key];
                      if([key] == "Industries") {
                        obj = industryList.find(o => o.IndustryId === object.id)
                        object.name = obj.IndustryName;
                      }
                      if([key] === "Modules") {
                      obj = modulesList.find(o => o.Key === object.id)
                      object.name = obj.Value;
                      } 
                        adjustedProjects[key].push(object);
                        projects[i][key] = [];
                    }
                } 
            }  
            else {
              let object = new Object();
              object.id = projects[i][key];
              if([key] == "Industries") {
                obj = industryList.find(o => o.IndustryId === object.id)
                object.name = obj.IndustryName;
              }
              if([key] == "Modules") {
              obj = modulesList.find(o => o.Key === object.id)
              object.name = obj.Value;
              } 
                adjustedProjects[key].push(object);
                projects[i][key] = [];
            }
        }
        fullProjects[i] = adjustedProjects;
    }
    for(let i = 0; i < projects.length; i++) {
          projects[i].Industries = fullProjects[i].Industries;
          projects[i].Modules = fullProjects[i].Modules;
    } 
    commit('SET_USER_PROJECTS_LIST', projects); 
  },
  checkProjectKey({state, commit, getters, dispatch}, {key, object} ) {
    let modulesList = this.getters.getModulesList;
    let industryList = this.getters.getIndustryList;
    let obj;
  
    if([key] == "Industries") {
      obj = industryList.find(o => o.IndustryId === object.id)
      object.name = obj.IndustryName;
    }
    if([key] == "Modules") {
      obj = modulesList.find(o => o.Key === object.id)
      object.name = obj.Value;
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
