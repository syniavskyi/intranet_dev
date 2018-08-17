import axios from 'axios'
import moment from 'moment'
import router from '@/router/index.js'
import odata from 'odata'
// import i18n from '../../lang/lang'

let utils = require('../../../utils')

const state = {
    userExperience: [],
    showExperienceError: false
}

const mutations = { 
    SET_USER_EXPERIENCE(state, list, moment) {
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
            IsCurrent: false,
            Duplicated: null,
            WorkPosToChange: null,
            EmployerToChange: null,
            DateStartToChange: null,
            DateEndToChange: null,
            Duplicated: null

        })
    },
    removeUserExperience({getters}, index){
        const userExp = getters.getUserExperience,      
        data = userExp[index],
        url = 'UserExperiences' + '(' + "UserAlias='"+ data.UserAlias + "',WorkPos='" + data.WorkPos + "',Employer='" + data.Employer + "',DateStart='" + data.DateStart + "')"
  
        odata(url).remove().save(function (data) {
          console.log("removed");
          userEdu.splice(index, 1)
        }, function (status) {
          console.error(status); 
        });
    },
    saveNewUserExp({getters}, data) {
        data.UserAlias = 'UIO'
        data.DateStart = utils.formatDateForBackend(data.DateStart)
        data.DateEnd = utils.formatDateForBackend(data.DateEnd)
        data.IsCurrent = data.IsCurrent ? 'X' : '-'
        odata('UserExperiences').post(data).save(function (data) {
          console.log("Working");
        }, function (status) {
          console.error(status); 
        });
    },
    updateUserExp({getters}, data){
        data.UserAlias = 'UIO'
        // data.DateStart = utils.formatDateForBackend(data.DateStart)
        // data.DateEnd = utils.formatDateForBackend(data.DateEnd)
        data.DateStart ='/Date(1473465600000)/'
        data.DateEnd = '/Date(1473465600000)/'
        data.IsCurrent = data.IsCurrent ? 'X' : '-'
    
        const url = 'UserExperiences' + '(' + "UserAlias='"+ data.UserAlias + "',WorkPos='" + data.WorkPosToChange + "',Employer='" + data.EmployerToChange + "',DateStart='" + data.DateStartToChange + "')"
        odata(url).put(data).save(function (data) {
          console.log("changed");
        }, function (status) {
          console.error(status); 
        });
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