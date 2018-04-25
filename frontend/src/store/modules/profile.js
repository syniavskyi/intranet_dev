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
                email: res.data.userContacts[0].email,
                role: res.data.roles[0].name,
                birthDate: res.data.userInfo[0].birthDate,
                firstName: res.data.userInfo[0].firstName,
                gender: res.data.userInfo[0].gender,
                lastName: res.data.userInfo[0].lastName,
                skype: res.data.userContacts[0].skypeId,
                slack: res.data.userContacts[0].slackId,
                phone: res.data.userContacts[0].phone,
                address: res.data.userContacts[0].address,
                id: res.data.id
            }
            
            localStorage.setItem('userRole', userdata.role)
            commit('SET_USER_ROLE', userdata.role)
            commit('SET_USER_DATA', userdata)
        }).catch(error => {
            console.log(error)
        })
    },
    saveUserData({commit}, userData) {
        commit('SET_USER_DATA', userData)
        var params = new URLSearchParams()
            params.append('id', userData.id)
            params.append('address', userData.address)
            params.append('phone', userData.phone)
            params.append('email', userData.email)
            params.append('skypeId', userData.skype)
            params.append('slackId', userData.slack)

        axios({
            method: 'post',
            url: '/api/user/edit/contact',
            headers: { "Content-type": "application/x-www-form-urlencoded; charset=utf-8" },
            data: params   
        }).then(res => {
            console.log(res)
        }).catch(error => {
            console.log(error)
        }) 
    }
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