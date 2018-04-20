import axios from 'axios'
import router from '@/router/index.js'

const state = {
    userRoles: [],
    departmentList: [],
    emails: [],
    email: '',
    emailExists: false
};

const mutations = {
    GET_ROLE_LIST(state, data) {
        state.userRoles.push(data);
    },
    GET_DEP_LIST(state, data) {
        state.departmentList.push(data);
    },
    ADD_EMAILS(state, data) {
        state.emails.push(data);
    },
    ADD_PREFIX_EMAIL(state, data) {
        state.email = data;
    },
    EMAIL_EXISTS(state, data) {
        state.emailExists = data;
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
    getDepartmentList({commit}) {
        axios.get("/api/depsList").then(res => {
            const data = res.data;

            for(let key in data) {
                const dep = data[key];
                
                //for now
                if(data[key].depName.includes('Dabrowa')) {
                    data[key].depName = 'Dąbrowa Górnicza';
                } else if (data[key].depName.includes('Wroclaw')) {
                    data[key].depName = 'Wrocław';
                }
                dep.depName = data[key].depName;
                commit('GET_DEP_LIST', dep.depName);
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
                commit('EMAIL_EXISTS', bIsEmail);
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
    }
};

const getters = {
    roleList(state) {
        return state.userRoles;
    },
    depList(state) {
        return state.departmentList;
    },
    emails(state) {
        return state.emails;
    },
    prefixEmail(state) {
        return state.email;
    },
    isEmail(state) {
        return state.emailExists;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}