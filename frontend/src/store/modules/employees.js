import axios from 'axios'
import router from '@/router/index.js'

const state = {
    userList: []
};

const mutations = {
    GET_USER_LIST(state, data) {
        state.userList.push(data);
    }
};

const actions = {
    getUserInfo({commit}) {
        axios.get("/api/users")
            .then(res => {
                const data = res.data;

                for(let key in data) {
                    const user = data[key];

                    user.depName = user.deps[0] ? user.deps[0].depName : "";
                    user.roleName = user.roles[0] ? user.roles[0].name.slice(user.roles[0].name.indexOf("_") + 1, user.roles[0].name.length) : "";
                    // user.email = user.email ? user.email : "";
                    user.firstName = user.userInfo[0] ? user.userInfo[0].firstName : "";
                    user.lastName = user.userInfo[0] ? user.userInfo[0].lastName : "";
                    user.email = user.userContacts[0] ? user.userContacts[0].email : "";
                    user.phone = user.userContacts[0] ? user.userContacts[0].phone : "";

                    commit('GET_USER_LIST', user);
                }
            })
            .catch(function (error) {
                alert('brak połączenia');
            });
    }
};

const getters = {
    usersList(state) {
        return state.userList;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}