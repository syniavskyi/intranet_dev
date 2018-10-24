import axios from 'axios'
import moment from 'moment'
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
      dispatch('formatUserProjects', res.data.d.results)
      // dispatch('setUserAvails', userAvail)
    }).catch(error => {
      console.log(error)
    });
  },
  formatUserProjects({commit, getters}, userProjects){
    // set projects data with props for calendar 
        const projectsList = getters.projectsList
            for (let i=0; i<userProjects.length; i++) {
                for (let j=0; j<projectsList.length; j++){
                    if (userProjects[i].ProjectId === projectsList[j].ProjectId) {
                        userProjects[i].ProjectName = projectsList[j].ProjectName
                    } 
                }
            }
            for (let i=0; i<userProjects.length; i++) {
              let project = userProjects[i]
              project.Color = project.StatusId === 'PL' ? '#fde692' : '#cff09e'
              project.Order = project.StatusId === 'PL' ? 1 : 2
              project.EntryId = i
              project.StartDate = utils.dateStringToObj(project.StartDate)
              project.EndDate = utils.dateStringToObj(project.EndDate)
            }
            commit('SET_USER_AVAIL_PROJECTS', userProjects)
    },
    removeUserProject({commit, getters, dispatch}, data) {
      const URL = "UserAvailabilities(ProjectId='" + data.ProjectId + "',UserAlias='" + data.UserId + "',DateStart=datetime'" + moment(data.DateStart).format("YYYY-MM-DD") + "T00:00:00',DateEnd=datetime'"+ moment(data.DateEnd).format("YYYY-MM-DD") + "T00:00:00')"
      axios.delete(URL).then(res => {
          console.log(res)
          dispatch('getUserProjects', data.userId)
          dispatch('hideAllMessages')
          commit('SET_REMOVE_ERROR', false)
          commit('SET_REMOVE_SUCCESS', true)
      }).catch(error => {
          dispatch('hideAllMessages')
          commit('SET_REMOVE_ERROR', true)
          commit('SET_REMOVE_SUCCESS', false)
         console.log(error)
     });
  },
    addUserProject({commit, getters, dispatch}) {
      let data  = getters.getNewProjectForUser,
           url = 'UserProjects',
           sToken = getters.getToken,
          cookie = getters.getCookie;

      data.Engag = parseInt(data.Engag)
      axios({
        url: url,
        method: 'post',
        data: data,
        headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            "Cache-Control": "no-cache",
            "x-csrf-token": sToken,
            "Cookie": cookie
        }
      }).then(res => {
          console.log(res)
        }).catch(error => {
          console.log(error);
      })
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
