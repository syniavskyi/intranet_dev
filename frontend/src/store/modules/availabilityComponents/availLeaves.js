import axios from 'axios'
let utils = require('../../../utils')

const state = {
   userAvail: [],
   newLeaveForUser: {
       TypeId: null,
       UserId: null,
       StatusId: null,
       DateStart: null,
       DateEnd: null
   }
};

const mutations = {
    SET_USER_AVAIL(state, userAvail) {
        state.userAvail = userAvail
    },
};

const actions = {
    getUserAvail({commit, dispatch, getters}, userId) {
        //get user availability for calendar and editing availability 
            userId= 'UIO'
            let urlQuery = getters.getUrlQuery
            const URL = "UserAvailabilities" + urlQuery + "&$filter=UserId eq '" + userId + "'"
             axios.get(URL).then(res => {
                console.log(res)
                const userAvail = res.data.d.results
                for(let i = 0;i < userAvail.length; i++){
                    userAvail[i].DateStart = utils.dateStringToObj(userAvail[i].DateStart)
                    userAvail[i].DateEnd = utils.dateStringToObj(userAvail[i].DateEnd)
                }
                commit('SET_USER_AVAIL', userAvail)
                // dispatch('setUserAvails', userAvail)
            }).catch(error => {
                console.log(error)
            });
    },
    removeUserAvail({commit, getters, dispatch}, data) {
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
};

const getters = {
    getUserAvail(state){
        return state.userAvail
    },
    getNewLeaveForUser(state){
        return state.newLeaveForUser
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}
