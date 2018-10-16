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
                dispatch('formatUserLeaves', res.data.d.results)
            }).catch(error => {
                console.log(error)
                commit('SET_DISPLAY_LOADER', false)
            });
    },
    formatUserLeaves({commit, getters}, userAvail){
        // set projects data with props for calendar 
            const typesList = getters.getAvailType
                for (let i=0; i<userAvail.length; i++) {
                    for (let j=0; j<typesList.length; j++){
                        if (userAvail[i].TypeId === typesList[j].Key) {
                            userAvail[i].TypeName = typesList[j].Value
                        } 
                    }
                }
                for (let i=0; i<userAvail.length; i++) {
                  let avail = userAvail[i]
                  avail.Color = userAvail[i].StatusId === 'PL' ? '#fde692' : '#cff09e'
                  avail.Order = userAvail[i].StatusId === 'PL' ? 1 : 2
                  avail.EntryId = i
                  avail.DateStart = utils.dateStringToObj(avail.DateStart)
                  avail.DateEnd = utils.dateStringToObj(avail.DateEnd)
                }
                commit('SET_USER_AVAIL', userAvail)
                commit('SET_DISPLAY_LOADER', false)

        },
    removeUserAvail({commit, getters, dispatch}, index) {
        let data = getters.getUserAvail[index]
        const URL = "UserAvailabilities(TypeId='" + data.TypeId + "',UserId='" + data.UserId + "',DateStart=datetime'" + moment(data.DateStart).format("YYYY-MM-DD") + "T00:00:00',DateEnd=datetime'"+ moment(data.DateEnd).format("YYYY-MM-DD") + "T00:00:00')"
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
    addUserLeave({commit, getters, dispatch}) {
        let data  = getters.getNewLeaveForUser,
             url = 'UserAvailabilities',
             sToken = getters.getToken,
            cookie = getters.getCookie;
  
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
    }
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
