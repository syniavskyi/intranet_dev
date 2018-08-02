import axios from 'axios'

const state = {
    userInfo: {},
    cvElements: {
        photo: true,
        address: true,
        phone: true,
        date:true,
        name: true,
        language: null,
        format: null
    }
};

const mutations = {
    GET_USER_INFO(state, data) {
        state.userInfo = data;
    },
    SET_CV_ELEMENTS(state, data){
        state.cvElements = data
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
    },
    selectAllCvElements({getters, commit}) {
        let elements = getters.getCvElements,
            lang = elements.language,
            format = elements.format
        elements = {
                photo: true,
                address: true,
                phone: true,
                date:true,
                name: true,
                language: lang,
                format: format
        }
        commit('SET_CV_ELEMENTS', elements);
    },
    deselectAllCvElements({getters, commit}) {
        let elements = getters.getCvElements,
        lang = elements.language,
        format = elements.format
        elements = {
                photo: false,
                address: false,
                phone: false,
                date:false,
                name: false,
                language: lang,
                format: format
        }
        commit('SET_CV_ELEMENTS', elements);
    }
};

const getters = {
    userInfo(state) {
        return state.userInfo;
    },
    getCvElements(state){
        return state.cvElements
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}