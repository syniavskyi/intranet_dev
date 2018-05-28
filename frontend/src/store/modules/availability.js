import axios from 'axios'

const state = {
    userProjects: [],
    disableSaveNewProject: true,
    disableSaveEditProject: true,
    beforeEditingCache: null,
    hasDataChanged: false,
    projectExist: false,
    userProjectsToCheck:[],
    userId: null,
    userIdForNewProj: null,
    editError: false,
    addingError: false,
    removeError: false
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
    },
    SET_USER_ID(state, userId) {
        state.userId = userId
    },
    SET_USER_ID_FOR_NEW_PROJ(state, userId) {
        state.userIdForNewProj = userId
    },
    SET_EDIT_ERROR(state, isError) {
        state.editError = isError
    },
    SET_ADDING_ERROR(state, isError) {
        state.addingError = isError
    },
    SET_REMOVE_ERROR(state, isError) {
        state.removeError = isError
    },
};

const actions = {
    getUserProjects({commit, dispatch, getters}, userId) {
    //get user projects for calendar and editing projects 
        const URL = "/api/users/" + userId + "/userEngag"
         axios.get(URL).then(res => {
             console.log(res)
            const userProjects = res.data
            dispatch('setUserProjects', userProjects)
        }).catch(error => {
            console.log(error)
        });
    },
    setUserProjects({commit, getters}, userProjects){
    // set projects data with props for calendar 
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
                    userProjects[i].color = '#EDA1A1'
                    userProjects[i].order = 2
                } else {
                    userProjects[i].color = '#fde692'
                    userProjects[i].order = 1
                }
                userProjects[i].startDate = new Date(userProjects[i].startDate)
                userProjects[i].endDate = new Date(userProjects[i].endDate)
            }
            commit('SET_USER_PROJECTS', userProjects)
    },
     getUserProjectsToCheck({commit, getters}, userId){
        //  load user projects to validate adding new project
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
    removeUserProject({commit, getters, dispatch}, data) {
        const URL = "/api/users/" + data.userId + "/userEngag/" + data.projectId + "/delete"
        axios.delete(URL).then(res => {
            console.log(res)
            dispatch('getUserProjects', data.userId)
            // if the same user is selected in edit and add project, then load again projects
            // to validate adding new project 
            if (getters.getUserIdForNewProj === data.userId) {
                dispatch('getUserProjectsToCheck', getters.getUserIdForNewProj)
            }
            commit('SET_REMOVE_ERROR', false)
        }).catch(error => {
            commit('SET_REMOVE_ERROR', true)
           console.log(error)
       });
    },
    addUserProject({commit, getters, dispatch}, newProjectData) {
        if (newProjectData.dates === undefined) {
            const dates = {
                end: null,
                start: null
            }
            newProjectData.push(dates)
        }
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
            // if the same user is selected in add and edit project, then 
            // set again user's project in calendar and edit part
            if (getters.getSelectedUserId === data.userId) {
                dispatch('setUserProjects', response.data)
            }
            dispatch('getUserProjectsToCheck', newProjectData.userId)
            commit('SET_ADDING_ERROR', false)
            commit('SET_DISABLE_SAVE_NEW', true)
            commit('SET_ADDING_ERROR', false)
          })
          .catch(error => {
            console.log(error);
            commit('SET_ADDING_ERROR', true)
          });
    },
    editUserProject({commit, dispatch}, projectData) { 
        const URL = '/api/users/' + projectData.userId + '/userEngag/' + projectData.id + '/edit'

        axios.put( URL, {
            startDate: projectData.startDate,
            endDate: projectData.endDate,
            engag: projectData.engag, 
            projId: projectData.projId,
            contractorId: projectData.contractorId
          })
          .then(response => {
            commit('SET_EDIT_ERROR', false)
            dispatch('getUserProjects', projectData.userId)
            if (getters.getUserIdForNewProj === projectData.userId) {
                dispatch('getUserProjectsToCheck', projectData.userId)
            }
          })
          .catch(error => {
            console.log(error);
            commit('SET_EDIT_ERROR', true)
          });
    },
    validateNewProject({commit}, project){ 
        if (project.userId && project.projectId  && project.engag && project.contractorId && project.dates.start && project.dates.end) {
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
    getSelectedUserId(state){
        return state.userId
    },
    getUserIdForNewProj(state){
        return state.userIdForNewProj
    },
    getRemoveError(state){
        return state.removeError
    },
    getEditError(state){
        return state.editError
    },
    getAddingError(state){
        return state.addingError
    }


};

export default {
    state,
    mutations,
    actions,
    getters
}