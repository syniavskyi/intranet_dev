import axios from 'axios'
import router from '@/router/index.js'
// import i18n from '../../lang/lang'

const state = {
    userEducation: [
        {DateStart: new Date("2016","05","02"), DateEnd: new Date("2017","05","02"), AcademicTitle: 'Licencjat', FieldOfStudy: 'Zarządzanie', University: 'Politechnika', isCurrent: false, StudyType: 'Tryb dzienny', Duplicated: null},
        {DateStart: new Date("2017","05","02"), DateEnd: new Date("2018","05","02"), AcademicTitle: 'Licencjat', FieldOfStudy: 'Informatyka w biznesie', University: 'Ekonomiczny', isCurrent: false, StudyType: 'Tryb zaoczny',  Duplicated: null}
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
    addUserEduRow({getters, commit}){
        const userEdu = getters.getUserEducation
        userEdu.push({
            DateStart: null,
            DateEnd: null,
            AcademicTitle: null,
            FieldOfStudy: null,
            University: null,
            isCurrent: false,
            StudyType: null,
            Duplicated: null
        })
    },
    removeUserEducation({getters}, index){
        const userEdu = getters.getUserEducation
        userEdu.splice(index, 1)
    },
    addNewUserEducation({}, data){
        axios({
            method: 'POST',
            url: 'UserEducation',
             auth: {
              username: 'psy',
              password: 'ides01'
            },
            data: {
                data
            },
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=utf-8",
                "X-Requested-With": "XMLHttpRequest",
                "X-XHR-Logon": "accept='iframe'",
                "sap-contextid-accept": "header"
            }
        }).then(res => {
            console.log(res)
          }).catch(error => { 
            console.log(error);
         })
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