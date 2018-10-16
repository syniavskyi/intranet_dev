import moment from 'moment'
import odata from 'odata'
import axios from 'axios'

let utils = require('../../../utils')

const state = {
  userExperience: [],
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
  addUserExperience({
    getters
  }) {
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
      Duplicated: null,
      Language: null
    })
  },
  removeUserExperience({
    getters
  }, index) {
    const userExp = getters.getUserExperience,
      data = userExp[index]

    data.Language = 'PL'
    data.UserAlias = 'UIO'

    const url = 'UserExperiences' + '(' + "UserAlias='" + data.UserAlias + "',Language='" + data.Language + "',WorkPos='" + data.WorkPos + "',Employer='" + data.Employer + "',DateStart=datetime'" + moment(data.DateStart).format("YYYY-MM-DD") + "T00:00:00')"

    let sToken = getters.getToken;
    let cookie = getters.getCookie;
    axios({
      url: url,
      method: 'put',
      data: data,
      headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          "Cache-Control": "no-cache",
          "x-csrf-token": sToken,
          "Cookie": cookie
      }
    }).then(res => {
        console.log(res)
      }).catch(error => {
        console.log(error);
    })
  },
  saveNewUserExp({
    getters
  }, data) {
    data.UserAlias = 'UIO'
    data.DateStart = utils.formatDateForBackend(data.DateStart)
    data.DateEnd = utils.formatDateForBackend(data.DateEnd)
    data.DateEndToChange = null;
    data.DateStartToChange = null;
    data.IsCurrent = data.IsCurrent ? 'X' : '-'
    let url = 'UserExperiences';
    let sToken = getters.getToken;
    let cookie = getters.getCookie;
    axios({
      url: url,
      method: 'post',
      data: data,
      headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          "Cache-Control": "no-cache",
          "x-csrf-token": sToken,
          "Cookie": cookie
      }
    }).then(res => {
        console.log(res)
      }).catch(error => {
        console.log(error);
    })
  },
  updateUserExp({
    getters
  }, data) {
    data.UserAlias = 'UIO';
    data.DateStart = utils.formatDateForBackend(data.DateStart);
    data.DateEnd = utils.formatDateForBackend(data.DateEnd);
    data.IsCurrent = data.IsCurrent ? 'X' : '-';
    const url = 'UserExperiences' + '(' + "UserAlias='" + data.UserAlias + "',WorkPos='" + data.WorkPosToChange + "',Employer='" + data.EmployerToChange + "',Language='" + data.Language + "',DateStart=datetime'" + moment(data.DateStartToChange).format("YYYY-MM-DD") + "T00:00:00')";
    data.DateStartToChange = utils.formatDateForBackend(data.DateStartToChange);
    data.DateEndToChange = utils.formatDateForBackend(data.DateEndToChange);
    let sToken = getters.getToken;
    let cookie = getters.getCookie;
    axios({
      url: url,
      method: 'put',
      data: data,
      headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          "Cache-Control": "no-cache",
          "x-csrf-token": sToken,
          "Cookie": cookie
      }
    }).then(res => {
        console.log(res)
      }).catch(error => {
        console.log(error);
    })

  },
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
