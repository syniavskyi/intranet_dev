import axios from 'axios'
import router from '@/router/index.js'

const state = {
    userRoles: [],
    departmentList: [],
    emails: [],
    email: '',
    mail: '',
    emailExists: false,
    dialog: false
};

const mutations = {
    GET_ROLE_LIST(state, data) {
        state.userRoles = data;
    },
    GET_DEP_LIST(state, data) {
        state.departmentList = data;
    },
    ADD_EMAILS(state, data) {
        // state.emails.push(data);
        state.emails = data;
    },
    ADD_PREFIX_EMAIL(state, data) {
        state.email = data;
    },
    EMAIL_EXISTS(state, data) {
        state.emailExists = data;
    },
    OPEN_DIALOG(state, data) {
        state.dialog = data;
    },
    SET_MAIL(state, data) {
        state.mail = data;
    }
};

const actions = {
    getRoleList({commit}) {
        axios.get("/api/rolesList").then(res => {
            const data = res.data,
                  aData = [];

            for(let key in data) {
                const role = data[key];

                data[key].roleName = data[key].roleName.slice(data[key].roleName.indexOf("_") + 1, data[key].roleName.length);

                let upper = data[key].roleName.substring(0, 1),
                    toLower = data[key].roleName.slice(1, data[key].roleName.length).toLowerCase();

                data[key].roleName = upper + toLower;
                // role.roleName = data[key].roleName;
                aData.push(role.roleName);
            }
            commit('GET_ROLE_LIST', aData);
        });
    },
    getDepartmentList({commit}) {
        axios.get("/api/depsList").then(res => {
            const data = res.data,
                  aData = [];

            for(let key in data) {
                const dep = data[key];
                
                //for now
                if(data[key].depName.includes('Dabrowa')) {
                    data[key].depName = 'Dąbrowa Górnicza';
                } else if (data[key].depName.includes('Wroclaw')) {
                    data[key].depName = 'Wrocław';
                }
                aData.push(dep);
            }
            commit('GET_DEP_LIST', aData);
        });
    },
    checkEmail({commit, state, dispatch}, props) {
        axios.get('/api/emailList').then(res => {
            const data = res.data,
                  aData = [];

            for(let key in data) {
                const email = data[key];

                email.email = data[key].email;
                aData.push(email.email);
                // commit('ADD_EMAILS', email.email);
            }
            commit('ADD_EMAILS', aData);
            if(state.emails.length > 0) {
                var bIsEmail;
                
                for (var i = 0; i < state.emails.length; i++) {
                    if (props.fullNameToEmail === state.emails[i]) {
                        bIsEmail = true;
                        // dispatch('fullNameToEmail');
                        break;
                    } else {
                       bIsEmail = false; 
                       commit('SET_MAIL', props.mail);
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
        data.email = sReturnEmail
        commit('ADD_PREFIX_EMAIL', data.email);
    },
    submitRegistration({commit}, data) {
        data.openDialog = true;
        commit('OPEN_DIALOG', data.openDialog);
        data.role = 'ROLE_' + data.role.toUpperCase();
        console.log(data);
        axios.post('/api/register', {
            username: data.name,
            password: data.password,
            passwordConfirmation: data.password,
            email: data.mail,
            roles: [data.role],
            deps: [data.department]
        }).then(function(response) {
            console.log(response);
        }).catch(function(error) {
            console.log(error);
        })
    },
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
    },
    openDialog(state) {
        return state.dialog;
    },
    setMail(state) {
        return state.mail;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}