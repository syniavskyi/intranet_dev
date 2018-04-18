import axios from 'axios'
import router from '@/router/index.js'

const state = {
    idToken: null,
    password: '',
    hashedPassword: '',
    userRole: ''
}

const mutations = {
    CLEAR_AUTH_DATA (state){
        state.idToken = null;
    },
    SET_PASSWORD (state, data) {
        state.password = data;
    },
    SET_USER_ROLE (state, role) {
        state.userRole = role;
    },
    SET_HASHED_PASSWORD (state, password) {
        state.hashedPassword = password
    }
}

const actions = {
    logout({commit}){
        var token = localStorage.getItem('token')
        var URL = '/api/logout?access_token=' + token
        axios.get(URL).then(res => {
            commit('CLEAR_AUTH_DATA');
            localStorage.removeItem('expirationDate')
            localStorage.removeItem('token')
            router.replace('/');
        }).catch(error => {
            console.log(error)
        })
    },
    generatePassword({commit, state}) {
        const bcrypt = require('bcryptjs')
        var nLength = 8,
            sCharset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]\:;?><,./-=",
            sRetVal = "";

        for (var i = 0, n = sCharset.length; i < nLength; ++i) {
            sRetVal += sCharset.charAt(Math.floor(Math.random() * n));
        }
        bcrypt.genSalt(10, (error, salt) => {
            bcrypt.hash(sRetVal, salt, (err, hash) => {
                console.log(hash)
                commit('SET_HASHED_PASSWORD', hash)
            })
        })
        commit('SET_PASSWORD', sRetVal);
    }
}

const getters = {
    password(state) {
        return state.password;
    },
    
}

export default {
    actions,
    mutations,
    state,
    getters
}