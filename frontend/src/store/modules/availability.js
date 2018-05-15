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
    getUserProjects({commit}, userId) {
        const URL = "/api/users/" + userId + "/userEngag"
         axios.get(URL).then(res => {
             console.log(res)
            const userProjects = res.data
            
            for (let i=0; i<userProjects.length; i++) {
                if (userProjects[i].engag < 60 ) {
                    userProjects[i].color = '#FFFF99'
                } else {
                    userProjects[i].color = '#FF3333'
                }
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
    addUserProject({commit}, data) {
        const URL = '/api/users/' + data.userId + '/userEngag/create'
        axios.post( URL, {
            startDate: data.startDate,
            endDate: data.endDate,
            engag: data.engag, 
            projName: data.projName,
            contractorName: data.contractorName
          })
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.log(error);
          });
    },
    editUserProject({commit}, data) { 
        const URL = '/api/users/' + data.userId + '/userEngag/' + data.projectId + '/edit'
        axios.put( URL, {
            startDate: data.startDate,
            endDate: data.endDate,
            engag: data.engag, 
            projName: data.projName,
            contractorName: data.contractorName
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