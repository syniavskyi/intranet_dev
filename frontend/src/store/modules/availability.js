import axios from 'axios'

const state = {
    userProjects: []
};

const mutations = {
    SET_USER_PROJECTS(state, userProjects) {
        state.userProjects = userProjects
    }
};

const actions = {
    getUserProjects({commit, getters}, userId) {
        const URL = "/api/users/" + userId + "/userEngag"
         axios.get(URL).then(res => {
             console.log(res)
            const userProjects = res.data
            const projectsList = getters.projectsList
            for (let i=0; i<userProjects.length; i++) {
                for (let j=0; j<projectsList.length; j++){
                    if (userProjects[i].projId === projectsList[j].id) {
                        userProjects[i].projName = projectsList[j].name
                    } 
                }
            }
            for (let i=0; i<userProjects.length; i++) {
                if (userProjects[i].engag === "100") {
                    userProjects[i].color = '#FF3333'
                    userProjects[i].order = 2
                } else {
                    userProjects[i].color = '#FFCC00'
                    userProjects[i].order = 1
                }
                userProjects[i].startDate = new Date(userProjects[i].startDate)
                userProjects[i].endDate = new Date(userProjects[i].endDate)
            }
            commit('SET_USER_PROJECTS', userProjects)
        }).catch(error => {
            console.log(error)
        });
    },
    removeUserProject({commit, dispatch}, data) {
        const URL = "/api/users/" + data.userId + "/userEngag/" + data.projectId + "/delete"
        axios.delete(URL).then(res => {
            console.log(res)
            dispatch ('getUserProjects', data.userId)
       }).catch(error => {
           console.log(error)
       });
    },
    addUserProject({commit}, newProjectData) {
        const data = {
            userId: newProjectData.userId,
            projId: newProjectData.projectId,
            engag: newProjectData.engag,
            endDate: newProjectData.dates.end,
            startDate: newProjectData.dates.start,
            contractorId: newProjectData.contractorId
        }
        const URL = '/api/users/' + data.userId + '/userEngag/create'
        axios.post( URL, {
            startDate: data.startDate,
            endDate: data.endDate,
            engag: data.engag, 
            projId: data.projId,
            contractorId: data.contractorId
          })
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.log(error);
          });
    },
    editUserProject({commit}, projectData) { 
        const URL = '/api/users/' + projectData.userId + '/userEngag/' + projectData.id + '/edit'

        axios.put( URL, {
            startDate: projectData.startDate,
            endDate: projectData.endDate,
            engag: projectData.engag, 
            projId: projectData.projId,
            contractorId: projectData.contractorId
          })
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.log(err);
          });
    }
};

const getters = {
    userProjectsList (state) {
        return state.userProjects
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}