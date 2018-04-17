import axios from 'axios'
import router from '@/router/index.js'

const state = {
    userRoles: [],
    emails: [],
    email: '',
    password: ''
};

const mutations = {
    GET_ROLE_LIST(state, data) {
        state.userRoles.push(data);
    },
    ADD_EMAILS(state, data) {
        state.emails.push(data);
    },
    ADD_PREFIX_EMAIL(state, data) {
        state.email = data;
    },
    PASSWORD(state, data) {
        state.password = data;
    }
};

const actions = {
    getRoleList({commit}) {
        axios.get("/api/rolesList").then(res => {
            const data = res.data;

            for(let key in data) {
                const role = data[key];
                let upper = data[key].roleName.substring(0, 1),
                    toLower = data[key].roleName.slice(1, data[key].roleName.length).toLowerCase();

                data[key].roleName = upper + toLower;
                role.roleName = data[key].roleName;
                commit('GET_ROLE_LIST', role.roleName);
            }
        });
    },
    checkEmail({commit, state}, typedEmail) {
        axios.get('/api/emailList').then(res => {
            const data = res.data;

            for(let key in data) {
                const email = data[key];

                email.email = data[key].email;
                commit('ADD_EMAILS', email.email);
            }

            if(state.emails.length > 0) {
                var bIsEmail;
                
                for (var i = 0; i < state.emails.length; i++) {
                    if (typedEmail === state.emails[i]) {
                        bIsEmail = true;
                        break;
                    } else {
                       bIsEmail = false; 
                    }
                }
                bIsEmail ? alert('znaleziono email') : alert('nie znaleziono adresu email');
            }
        });
    },
    fullNameToEmail({commit, state}, data) {
        var sEmail = data.name.replace(" ", ".").toLowerCase(),
            sDomain = "@btech.pl",
            sReturnEmail;

        data.name === "" ? (sDomain = "") : (sReturnEmail = sEmail + sDomain);
        data.email = sReturnEmail;
        commit('ADD_PREFIX_EMAIL', data.email);
    },
    generatePassword({commit, state}) {
        var nLength = 8,
            sCharset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]\:;?><,./-=",
            sRetVal = "";

        for (var i = 0, n = sCharset.length; i < nLength; ++i) {
            sRetVal += sCharset.charAt(Math.floor(Math.random() * n));
        }
        commit('PASSWORD', sRetVal);
    }
};

const getters = {
    roleList() {
        return state.userRoles;
    },
    emails() {
        return state.emails;
    },
    prefixEmail() {
        return state.email;
    },
    password() {
        return state.password;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}