import axios from 'axios'
import router from '@/router/index.js'
// import i18n from '../../lang/lang'

const state = {
    userEducation: [
        {DateStart: new Date("2016","05","02"), DateEnd: new Date("2017","05","02"), AcademicTitle: 'Licencjat', FieldOfStudy: 'Zarządzanie', University: 'Politechnika', isCurrent: false, StudyType: 'Tryb dzienny'},
        {DateStart: new Date("2017","05","02"), DateEnd: new Date("2018","05","02"), AcademicTitle: 'Licencjat', FieldOfStudy: 'Informatyka w biznesie', University: 'Ekonomiczny', isCurrent: false, StudyType: 'Tryb zaoczny'}
    ],
    showEducationError: false
}

const mutations = { 
    SET_USER_EDUCATION(state, list) {
        state.userEducation = list
    },
    SET_EDUCATION_ERROR(state, isError) {
        state.showEducationError = isError
    }
}

const actions = {
    addUserEducation({getters, commit}){
        const userEdu = getters.getUserEducation
        userEdu.push({
            DateStart: null,
            DateEnd: null,
            AcademicTitle: null,
            FieldOfStudy: null,
            University: null,
            isCurrent: false,
            StudyType: null
        })
    },
    removeUserEducation({getters}, index){
        const userEdu = getters.getUserEducation
        userEdu.splice(index, 1)
    }
}

const getters = {
    getUserEducation(state) {
        return state.userEducation
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}