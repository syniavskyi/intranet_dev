import axios from 'axios'
import router from '@/router/index.js'

const state = {
    userData: {}
};

const mutations = {
    SET_USER_DATA (state, data) {
        state.userData = data;
    }
};

const actions = {
    getUserData({commit, getters, dispatch},  username){
        dispatch('getDepartmentList')
        var URL = '/api/user/' + username
        axios.get(URL).then(res => {
            var departmentId = res.data.deps[0].depName;
            for (var i=0; i < getters.depList.length; i++) {
                if (departmentId = getters.depList[i].depId) {
                    var departmentName = getters.depList[i].depName
                }
            }
            const userdata = {
                departmentId: departmentId,
                departmentName: departmentName,
                email: res.data.userInfo[0].email,
                role: res.data.roles[0].name,
                birthDate: res.data.userInfo[0].birthDate,
                firstName: res.data.userInfo[0].firstName,
                gender: res.data.userInfo[0].gender,
                lastName: res.data.userInfo[0].lastName
            }
            

            localStorage.setItem('userRole', userdata.role)
            commit('SET_USER_ROLE', userdata.role)
            commit('SET_USER_DATA', userdata)
        }).catch(error => {
            console.log(error)
        })
    },
};

const getters = {
    userData(state){
        return state.userData
    }

};

export default {
    state,
    mutations,
    actions,
    getters
}