import axios from 'axios'
import router from '@/router/index.js'
// import i18n from '../../lang/lang'

const state = {
    userExperience: [
        {DateStart: 'Wed May 02 2016 00:00:00 GMT+0200 (Środkowoeuropejski czas letni)', DateEnd: 'Wed May 02 2017 00:00:00 GMT+0200 (Środkowoeuropejski czas letni)', Employer: 'BTech', WorkPos: 'SAP Fiori Developer', isCurrent: false},
        {DateStart: 'Wed May 02 2015 00:00:00 GMT+0200 (Środkowoeuropejski czas letni)', DateEnd: 'Wed May 02 2018 00:00:00 GMT+0200 (Środkowoeuropejski czas letni)', Employer: 'BPX', WorkPos: 'Konsultant SAP MM', isCurrent: true}
    ],
    showExperienceError: false
}

const mutations = { 
    SET_USER_EXPERIENCE(state, list) {
        state.userExperience = list
    },
    SET_EXPERIENCE_ERROR(state, isError) {
        state.showExperienceError = isError
    }
}

const actions = {
    addUserExperience({getters, commit}){
        const userExp = getters.getUserExperience
        userExp.push({
            DateStart: null,
            DateEnd: null,
            Employer: null,
            WorkPos: null,
            isCurrent: false
        })
    },
    removeUserExperience({getters}, index){
        const userExp = getters.getUserExperience
        userExp.splice(index, 1)
    }
}

const getters = {
    getUserExperience(state) {
        return state.userExperience
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}