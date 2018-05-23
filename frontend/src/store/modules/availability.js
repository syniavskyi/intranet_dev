import axios from 'axios'

const state = {
    userProjects: [],
    disableSaveNewProject: true,
    disableSaveEditProject: true,
    beforeEditingCache: null,
    hasDataChanged: false,
    projectExist: false,
    userProjectsToCheck:[]
};

const mutations = {
    SET_USER_PROJECTS(state, userProjects) {
        state.userProjects = userProjects
    },
    SET_DISABLE_SAVE_NEW(state, isDisabled) {
        state.disableSaveNewProject = isDisabled
    },
    SET_DISABLE_SAVE_EDIT(state, isDisabled) {
        state.disableSaveEditProject = isDisabled
    },
    SET_BEFORE_EDIT_CACHE(state, cache) {
        state.beforeEditingCache = cache
    },
    SET_HAS_DATA_CHANGED(state, hasChanged) {
        state.hasDataChanged = hasChanged
    },
    SET_PROJECT_EXIST(state, ifExist){
        state.projectExist = ifExist
    },
    SET_USER_PROJECTS_TO_CHECK(state, userProjects) {
        state.userProjectsToCheck = userProjects
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
    getUserProjectsToCheck({commit, getters}, userId){
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
            commit('SET_USER_PROJECTS_TO_CHECK', userProjects)
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
    },
    validateNewProject({commit}, project){ 
        const projExist = getters.getProjectExist
        if (projExist === true) {
            commit('SET_DISABLE_SAVE_EDIT', true) 
            return
        }
        if (project.userId && project.projectId && project.contractorId && project.engag && project.dates) {
                commit('SET_DISABLE_SAVE_NEW', false) 
            } else {
                commit('SET_DISABLE_SAVE_NEW', true) 
            }
    },
    validateEditProject({commit, dispatch, getters}, project){
        dispatch('checkIfDataChanged', project)
        const hasChanged = getters.getHasDataChanged
            if (hasChanged === false) {
                commit('SET_DISABLE_SAVE_EDIT', true) 
                return
            }
            if (project.engag && project.startDate && project.endDate) {
                commit('SET_DISABLE_SAVE_EDIT', false) 
            } else {
                commit('SET_DISABLE_SAVE_EDIT', true) 
            }
    },
    checkIfDataChanged({commit, dispatch, getters}, project) {
        let currentData = Object.assign({}, project),
        beforeEditing = Object.assign({}, getters.getBeforeEditingCache),
        currDataProps = Object.getOwnPropertyNames(currentData),
        beforeDataProps = Object.getOwnPropertyNames(beforeEditing)

        for (var i = 0; i < beforeDataProps.length; i++) {
            var propName = beforeDataProps[i];
            if (currentData[propName] !== beforeEditing[propName]) {
                commit('SET_HAS_DATA_CHANGED', true)
                return
            } else {
                commit('SET_HAS_DATA_CHANGED', false)
            }
        }
    },

};

const getters = {
    userProjectsList (state) {
        return state.userProjects
    },
    getDisableSaveNewProject(state) {
        return state.disableSaveNewProject
    },
    getDisableSaveEditProject(state) {
        return state.disableSaveEditProject
    },
    getBeforeEditingCache(state) {
        return state.beforeEditingCache
    },
    getHasDataChanged(state) {
        return state.hasDataChanged
    },
    getProjectExist(state) {
        return state.projectExist
    },
    userProjectsToCheckList (state) {
        return state.userProjectsToCheck
    },


};

export default {
    state,
    mutations,
    actions,
    getters
}