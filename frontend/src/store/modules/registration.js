import axios from 'axios'
import router from '@/router/index.js'

const state = {
    userRoles: [],
    departmentList: [],
    emails: [],
    email: '',
    emailExists: false,
    dialog: false
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
    },
    OPEN_DIALOG(state, data) {
        state.dialog = data;
    }
};

const actions = {
    getRoleList({commit}) {
        axios.get("/api/rolesList").then(res => {
            const data = res.data;

            for(let key in data) {
                let role = data[key],
                    upper = data[key].roleName.substring(0, 1),
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
                let dep = data[key];
                
                //for now
                if(data[key].depName.includes('Dabrowa')) {
                    data[key].depName = 'Dąbrowa Górnicza';
                } else if (data[key].depName.includes('Wroclaw')) {
                    data[key].depName = 'Wrocław';
                }
                // dep.depName = data[key].depName;
                // dep.depName = data[key].depName;
                // dep = data[key].dep;
                commit('GET_DEP_LIST', dep);
                // commit('GET_DEP_LIST', dep.depName, dep.depId);
            }
            // commit('GET_DEP_LIST', aDep);
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
                
                for (let i = 0; i < state.emails.length; i++) {
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
    fullNameToEmail({commit}, data) {
        var sEmail = data.name.replace(" ", ".").toLowerCase(),
            sDomain = "@btech.pl",
            sReturnEmail;

        data.name === "" ? (sDomain = "") : (sReturnEmail = sEmail + sDomain);
        data.email = sReturnEmail;
        commit('ADD_PREFIX_EMAIL', data.email);
    },
    submitRegistration({commit}, data) {
        data.openDialog = true;
        commit('OPEN_DIALOG', data.openDialog);
        // const data = data.department.id
        // console.log(data);
        axios.post('/api/register', {
            username: data.name,
            password: data.password,
            passwordConfirmation: data.password,
            email: data.email,
            roles: ["ROLE_ADMIN"],
            deps: [data.depId]
        }).then(function(response) {
            console.log(data);
            console.log(response);
        }).catch(function(error) {
            console.log(error);
        })
    },
    closeDialog({commit}, data) {
        commit('OPEN_DIALOG', data);
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
    },
    openDialog(state) {
        return state.dialog;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}