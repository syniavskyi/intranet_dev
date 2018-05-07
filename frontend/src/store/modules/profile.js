import axios from 'axios'
import router from '@/router/index.js'

const state = {
    saveChangesSuccess: true
};

const mutations = {
    SET_SAVE_CHANGES_STATE (state, isSuccess) {
        state.saveChangesSuccess = isSuccess
    }
};

const actions = {
    saveContactData({commit}, userData) {
        commit('SET_USER_DATA', userData)
        var params = new URLSearchParams()
            params.append('id', localStorage.getItem('id'))
            params.append('address', userData.address)
            params.append('phone', userData.phone)
            params.append('email', userData.email)
            params.append('skypeId', userData.skype)
            params.append('slackId', userData.slack)

        axios({
            method: 'post',
            url: '/api/user/edit/contactNew/',
            headers: { "Content-type": "application/x-www-form-urlencoded; charset=utf-8" },
            data: params   
        }).then(res => {
            commit('SET_SAVE_CHANGES_STATE', true)
            console.log(res)
        }).catch(error => {
            commit('SET_SAVE_CHANGES_STATE', false)
            console.log(error)
        }) 
    },

    submitPhoto({commit}, data) {
        let formData = new FormData()
        formData.append('file', data.file)
        formData.append('id', data.id)
        axios({
            method: 'post',
            url: 'http://10.0.2.60:8080/api/files/uploadImage',
            headers: { "Content-type": "multipart/form-data" },
            data: formData   
        }).then(res => {
            console.log(res)
            commit('SET_PHOTO', res.data.fileDownloadUri)
        }).catch(error => {
            console.log(error)
        }) 
    }
};

const getters = {
    isSaveChangesSuccess(state) {
        return state.saveChangesSuccess
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}