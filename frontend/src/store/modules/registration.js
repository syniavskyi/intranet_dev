import axios from 'axios'
import router from '@/router/index.js'

const state = {
    role: []
};

const mutations = {

};

const actions = {
    getRoleList({commit}) {
        var vm = this;
        axios.get("/api/rolesList").then(res => {
            const data = res.data;

            for(let key in data) {
                const role = data[key];
                let upper = data[key].roleName.substring(0, 1);
                let toLower = data[key].roleName.slice(1, data[key].roleName.length).toLowerCase();
                data[key].roleName = upper + toLower;
                role.roleName = data[key].roleName;
                
                role.push(role.roleName);
            }
        });
    }
};

const getters = {

};

export default {
    state,
    mutations,
    actions,
    getters
}