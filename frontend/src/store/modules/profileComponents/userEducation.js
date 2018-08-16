import axios from 'axios'
import router from '@/router/index.js'
// import i18n from '../../lang/lang'
import js2xml from 'js2xmlparser'
import jsontoxml from 'jsontoxml'
import moment from "moment";

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
        const userEdu = getters.getUserEducation,
              data = userEdu[index],
              url = '/UsersEducation' + '(' + "UserAlias='UIO'," + "University='" + data.University + "',AcademicTitle='"+ data.AcademicTitle + "',FieldOfStudy='"+ data.FieldOfStudy  + "')"
        axios({
            method: 'DELETE',
            url: url,
             auth: {
              username: 'psy',
              password: 'ides01'
            },
            headers: {
                "Content-type": "application/atom+xml; type=entry; charset=utf-8",
                "X-Requested-With": "XMLHttpRequest"
            }
        }).then(res => {
            console.log(res)
          }).catch(error => { 
            console.log(error);
         })
        userEdu.splice(index, 1)
    },
    editUserEducation({getters}, data){
        const props = {
            "d:UserAlias": 'UIO',
            "d:UniversityToChange": data.UniversityToChange,
            "d:FieldOfStudyToChange": data.FieldOfStudyToChange,
            "d:AcademicTitleToChange": data.AcademicTitleToChange,
            "d:University": data.University,
            "d:AcademicTitle": data.AcademicTitle,
            "d:FieldOfStudy": data.FieldOfStudy,
            "d:IsCurrent": '',
            "d:StudyType": data.StudyType,
            "d:DateStart": moment(data.DateStart).format("YYYY-MM-DD").toString() + 'T00:00:00',
            "d:DateEnd":moment(data.DateEnd).format("YYYY-MM-DD").toString() + 'T00:00:00'
        }
        const xml = jsontoxml(props, {html: true}),
              xmlRequest = getters.getPreHtmlForRequest + xml + getters.getPostHtmlForRequest
             
        axios({
            method: 'PUT',
            url: data.url,
             auth: {
              username: 'psy',
              password: 'ides01'
            },
            data: xmlRequest,
            headers: {
                "Content-type": "application/atom+xml; type=entry; charset=utf-8",
                "X-Requested-With": "XMLHttpRequest"
            }
        }).then(res => {
            console.log(res)
          }).catch(error => { 
            console.log(error);
         })
    },
    addUserEducation({getters}, data){
        const props = {
            "d:UserAlias": 'UIO',
            "d:UniversityToChange": '',
            "d:FieldOfStudyToChange": '',
            "d:AcademicTitleToChange": '',
            "d:University": data.University,
            "d:AcademicTitle": data.AcademicTitle,
            "d:FieldOfStudy": data.FieldOfStudy,
            "d:IsCurrent": '',
            "d:StudyType": data.StudyType,
            "d:DateStart": moment(data.DateStart).format("YYYY-MM-DD").toString() + 'T00:00:00',
            "d:DateEnd":moment(data.DateEnd).format("YYYY-MM-DD").toString() + 'T00:00:00'
        }
        const xml = jsontoxml(props, {html: true}),
              xmlRequest = getters.getPreHtmlForRequest + xml + getters.getPostHtmlForRequest
             
        axios({
            method: 'POST',
            url: '/UsersEducation',
             auth: {
              username: 'psy',
              password: 'ides01'
            },
            data: xmlRequest,
            headers: {
                "Content-type": "application/atom+xml; type=entry; charset=utf-8",
                "X-Requested-With": "XMLHttpRequest"
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