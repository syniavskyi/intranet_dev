import axios from 'axios'

const state = {
    idToken: null,
  	userId: null    
}

const mutations = {
    AUTH_USER(state, userData){
        state.idToken = userData.token;
        state.userId = userData.userId;
    },
}

const actions = {
    login({commit, dispatch}, authData) {
        axios.post('/', {
            username: authData.username,
            password: authData.password,
            returnSecureToken: true
    }).then(res =>{
        console.log(res);
        commit('AUTH_USER', {
            token: res.data.idToken,
            userId: res.data.localId
        })
        localStorage.setItem('token', res.data.idToken)
        localStorage.setItem('userId', res.data.localId)
    }).catch(error => console.log(error))
    }
}

const getters = {
    isAuthenticated (state) {
        return state.idToken !== null
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}