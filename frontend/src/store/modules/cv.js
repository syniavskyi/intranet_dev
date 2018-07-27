import axios from 'axios'

const state = {
    userInfo: {}
};

const mutations = {
    GET_USER_INFO(state, data) {
        state.userInfo = data;
    }
};

const actions = {
    getUserInfo({ commit }) {
        axios({
            method: 'GET',
            url: 'Users' + '(' + "'KBO'" + ')',
            auth: {
                username: 'psy',
                password: 'ides01'
            },
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
            }
        }).then(res => {
            let oUserData = res.data.d;
            commit('GET_USER_INFO', oUserData);
        }).catch(error =>{ })
    }
};

const getters = {
    userInfo(state) {
        return state.userInfo;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}