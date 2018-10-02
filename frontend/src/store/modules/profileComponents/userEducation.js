import axios from 'axios'
import odata from 'odata'
let utils = require('../../../utils')

const state = {
  userEducation: [],
  showEducationError: false,
  schoolDescList: [],
  fieldOfStudyDescList: []
}

const mutations = {
  SET_USER_EDUCATION(state, list) {
    state.userEducation = list
  },
  SET_EDUCATION_ERROR(state, isError) {
    state.showEducationError = isError
  },
  SET_SCHOOL_DESC_LIST(state, data) {
    state.schoolDescList = data;
  },
  SET_FIELD_OF_STUDY_DESC_LIST(state, data) {
    state.fieldOfStudyDescList = data;
  },
}

const actions = {
  addUserEduRow({
    getters,
  }) {
    const userEdu = getters.getUserEducation
    userEdu.push({
      DateStart: null,
      DateEnd: null,
      AcademicTitle: null,
      FieldOfStudy: null,
      University: null,
      IsCurrent: false,
      StudyType: null,
      Duplicated: null,
      SchoolDescription: null,
      UniversityToChange: null,
      FieldOfStudyToChange: null,
      AcademicTitleToChange: null,
      FieldOfStudyDescription: null,
      Language: 'PL'
    })
  },
  removeUserEducation({
    getters
  }, index) {
    const lang = 'PL'
    const userEdu = getters.getUserEducation,
      data = userEdu[index],
      url = 'UsersEducation' + '(' + "UserAlias='UIO'," + "University='" + data.University + "',AcademicTitle='" + data.AcademicTitle + "',FieldOfStudy='" + data.FieldOfStudy + "',Language='" + lang + "')"

    data.Language = 'PL'
    odata(url).remove().save(function (data) {
      console.log("removed");
      userEdu.splice(index, 1)
    }, function (status) {
      console.error(status);
    });
  },
  editUserEducation({
    getters
  }, data) {
    data.UserAlias = 'UIO'
    data.Language = 'PL'
    data.DateStart = utils.formatDateForBackend(data.DateStart)
    data.DateEnd = utils.formatDateForBackend(data.DateEnd)
    data.IsCurrent = data.IsCurrent ? 'X' : '-'
    let query = getters.getUrlQuery
    const url = 'UsersEducation' + '(' + "UserAlias='" + data.UserAlias + "',University='" + data.UniversityToChange + "',AcademicTitle='" + data.AcademicTitleToChange + "',FieldOfStudy='" + data.FieldOfStudyToChange + "',Language='" + data.Language + "')" + query
    odata(url).put(data).save(function (data) {
      console.log("changed");
    }, function (status) {
      console.error(status);
    });
  },
  addUserEducation({
    getters
  }, data) {
    data.UserAlias = 'UIO'
    data.Language = 'PL'
    data.DateStart = utils.formatDateForBackend(data.DateStart)
    data.DateEnd = utils.formatDateForBackend(data.DateEnd)
    data.IsCurrent = data.IsCurrent ? 'X' : '-'
    let url =  'UsersEducation' + '(' + "UserAlias='" + data.UserAlias + "',University='" + data.UniversityToChange + "',AcademicTitle='" + data.AcademicTitleToChange + "',FieldOfStudy='" + data.FieldOfStudyToChange + "',Language='" + data.Language + "')" + query
  
    axios({
      url: url,
      method: 'PUT',
      data: data,
      headers: {
          "Content-type": "application/atom+xml; type=entry; charset=utf-8",
          "X-Requested-With": "XMLHttpRequest",
          "x-csrf-token": getters.getToken
      }
    }).then(res => {
        console.log(res)
      }).catch(error => {
        console.log(error);
    })


    // odata('UsersEducation').post(data).save(function (data) {
    //   console.log("Working");
    // }, function (status) {
    //   console.error(status);
    // });
  },
  // get description for school from text table
  getSchoolDesc({
    commit,
    getters
  }, lang) {
    if (lang === undefined) {
      lang = "PL"
    }
    let urlQuery = getters.getUrlQuery
    axios({
      method: 'GET',
      url: "SchoolDesc" + urlQuery + "&$filter=Language eq " + "'" + lang + "'",
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
      }
    }).then(res => {
      commit('SET_SCHOOL_DESC_LIST', res.data.d.results);
    }).catch(error => {
      console.log(error)
    })
  },
  // get description for field of study from text table
  getFieldOfStudyDesc({
    commit,
    getters
  }, lang) {
    if (lang === undefined) {
      lang = "PL"
    }
    let urlQuery = getters.getUrlQuery
    axios({
      method: 'GET',
      url: "FieldOfStudyDesc" + urlQuery + "&$filter=Language eq '" + lang + "'",
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
      }
    }).then(res => {
      commit('SET_FIELD_OF_STUDY_DESC_LIST', res.data.d.results);
    }).catch(error => {
      console.log(error)
    })
  }
}

const getters = {
  getUserEducation(state) {
    return state.userEducation
  },
  getSchoolDescList(state) {
    return state.schoolDescList;
  },
  getFieldOfStudyDescList(state) {
    return state.fieldOfStudyDescList;
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
