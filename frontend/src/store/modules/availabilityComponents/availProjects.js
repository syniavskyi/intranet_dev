import axios from 'axios'
let utils = require('../../../utils')

const state = {
  userAvailProjects: [],
  newProjectForUser: {
    UserAlias: null,
    ProjectId: null,
    ContractorId: null,
    Engag: null,
    StatusId: null,
    Description: null
  }
};

const mutations = {
  SET_USER_AVAIL_PROJECTS(state, userAvail) {
    state.userAvailProjects = userAvail
  },
  SET_USER_PROJECTS(state, userProjects) {
    state.userProjects = userProjects
  },
  SET_NEW_PROJECT_FOR_USER(state, project) {
    state.newProjectForUser = project
  }
};

const actions = {
  getUserProjects({
    commit,
    dispatch,
    getters
  }, userId) {
    //get user availability for calendar and editing availability 
    userId = 'UIO'
    let urlQuery = getters.getUrlQuery
    const URL = "UserProjects" + urlQuery + "&$filter=UserAlias eq '" + userId + "'"
    axios.get(URL).then(res => {
      console.log(res)
      const userProj = res.data.d.results
      for (let i = 0; i < userProj.length; i++) {
        userProj[i].StartDate = utils.dateStringToObj(userProj[i].StartDate)
        userProj[i].EndDate = utils.dateStringToObj(userProj[i].EndDate)
      }

      dispatch('setUserProjects', userProj)
      // dispatch('setUserAvails', userAvail)
    }).catch(error => {
      console.log(error)
    });
  },
  setUserProjects({commit, getters}, userProjects){
    // set projects data with props for calendar 
        // const projectsList = getters.projectsList
        //     for (let i=0; i<userProjects.length; i++) {
        //         for (let j=0; j<projectsList.length; j++){
        //             if (userProjects[i].projId === projectsList[j].id) {
        //                 userProjects[i].projName = projectsList[j].name
        //             } 
        //         }
        //     }
        //     for (let i=0; i<userProjects.length; i++) {
        //         if (userProjects[i].engag === "100") {
        //             userProjects[i].color = '#EDA1A1'
        //             userProjects[i].order = 2
        //         } else {
        //             userProjects[i].color = '#fde692'
        //             userProjects[i].order = 1
        //         }
        //         userProjects[i].startDate = new Date(userProjects[i].startDate)
        //         userProjects[i].endDate = new Date(userProjects[i].endDate)
        //     }
            commit('SET_USER_AVAIL_PROJECTS', userProjects)
    },
        
    removeUserProject({commit, getters, dispatch}, data) {
    //     const URL = "/api/users/" + data.userId + "/userEngag/" + data.projectId + "/delete"
    //     axios.delete(URL).then(res => {
    //         console.log(res)
    //         dispatch('getUserProjects', data.userId)
    //         dispatch('hideAllMessages')
    //         commit('SET_REMOVE_ERROR', false)
    //         commit('SET_REMOVE_SUCCESS', true)
    //         commit('SET_PROJECT_TO_EDIT', {})
    //     }).catch(error => {
    //         dispatch('hideAllMessages')
    //         commit('SET_REMOVE_ERROR', true)
    //         commit('SET_REMOVE_SUCCESS', false)
    //        console.log(error)
    //    });
    },
    addUserProject({commit, getters, dispatch}) {
        // const newProjectData = getters.getNewProjectForUser
        // if (newProjectData.dates === undefined) {
        //     const dates = {
        //         end: null,
        //         start: null
        //     }
        //     newProjectData.push(dates)
        // }
        // const data = {
        //     userId: newProjectData.userId,
        //     projId: newProjectData.projectId,
        //     engag: newProjectData.engag,
        //     endDate: newProjectData.dates.end,
        //     startDate: newProjectData.dates.start,
        //     contractorId: newProjectData.contractorId
        // }
        // const URL = '/api/users/' + data.userId + '/userEngag/create'
        // axios.post( URL, {
        //     startDate: data.startDate,
        //     endDate: data.endDate,
        //     engag: data.engag, 
        //     projId: data.projId,
        //     contractorId: data.contractorId
        //   })
        //   .then(response => {
        //     // if the same user is selected in add and edit project, then 
        //     // set again user's project in calendar and edit part
        //     if (getters.getSelectedUserId === data.userId) {
        //         dispatch('setUserProjects', response.data)
        //     }
        //     dispatch('hideAllMessages')
        //     commit('SET_ADDING_ERROR', false)
        //     commit('SET_SAVE_DATA_SUCCESS', true)
        //     commit('SET_DISABLE_SAVE_NEW', true)
        //     commit('SET_NEW_PROJECT_FOR_USER', {})
        //   })
        //   .catch(error => {
        //     console.log(error);
        //     dispatch('hideAllMessages')
        //     commit('SET_ADDING_ERROR', true)
        //     commit('SET_SAVE_DATA_SUCCESS', false)
        //   });
    },
    editUserProject({commit, dispatch}, projectData) { 
        // const URL = '/api/users/' + projectData.userId + '/userEngag/' + projectData.id + '/edit'

        // axios.put( URL, {
        //     startDate: projectData.startDate,
        //     endDate: projectData.endDate,
        //     engag: projectData.engag, 
        //     projId: projectData.projId,
        //     contractorId: projectData.contractorId
        //   })
        //   .then(response => {
        //     dispatch('hideAllMessages')
        //     commit('SET_EDIT_ERROR', false)
        //     commit('SET_SAVE_DATA_SUCCESS', true)
        //     commit('SET_PROJECT_TO_EDIT', {})
        //     dispatch('getUserProjects', projectData.userId)

        //   })
        //   .catch(error => {
        //     console.log(error);
        //     dispatch('hideAllMessages')
        //     commit('SET_EDIT_ERROR', true)
        //     commit('SET_SAVE_DATA_SUCCESS', false)
        //   });
    },
};

const getters = {
    getNewProjectForUser(state) {
        return state.newProjectForUser
    },
    userProjectsList(state) {
        return state.userAvailProjects
    }

};

export default {
  state,
  mutations,
  actions,
  getters
}
