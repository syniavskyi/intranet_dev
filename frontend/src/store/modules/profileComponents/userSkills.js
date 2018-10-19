import odata from 'odata';
import axios from 'axios';
let utils = require('../../../utils');

const state = {
  userSkills: {
    SapModules: [],
    ProgramLang: [],
    Technologies: [],
    Extensions: [],
    AdditionalSkills: []
  },
  userLanguages: [],
  fullLanguageList: []
}

const mutations = {
  SET_USER_SKILLS(state, list) {
    state.userSkills = list
  },
  SET_USER_LANGS(state, list) {
    state.userLanguages = list
  },
  SET_LANGUAGE_LIST(state, data) {
    state.fullLanguageList = data;
  }
}

const actions = {
  addModuleForSkills({
    commit,
    getters
  }, moduleId) {
    const skillsList = getters.getUserSkills,
      modules = skillsList.SapModules

    let moduleExist = null

    if (modules.length !== 0) {
      for(let items of modules){
        if (items === moduleId) {
          moduleExist = true
          return
        } else {
          moduleExist = false
        }
      }
    } else {
      moduleExist = false
    }

    if (moduleExist === false) {
      skillsList.SapModules.push(moduleId)
      commit('SET_USER_SKILLS', skillsList)
    }
  },
  removeModuleForSkills({
    commit,
    getters
  }, moduleId) {
    const skillsList = getters.getUserSkills,
      modules = skillsList.SapModules
    for (let i = 0; i < modules.length; i++) {
      if (modules[i] === moduleId) {
        modules.splice(i, 1)
      }
    }
    commit('SET_USER_SKILLS', skillsList)
  },

  removeSkill({
    commit,
    getters
  }, skill) {
    const skillsList = getters.getUserSkills,
      list = skillsList[skill.name]
    for (let i = 0; i < list.length; i++) {
      if (list[i] === skill.value) {
        list.splice(i, 1)
      }
    }
    commit('SET_USER_SKILLS', skillsList)
  },
  //add new skill
  addSkill({
    commit,
    getters
  }, skill) {
    const skillsList = getters.getUserSkills,
      list = skillsList[skill.name]

    let ifExist = null

    if (list.length !== 0) {
      for(let items of list){
        if (items === skill.value || /^\s*$/.test(skill.value)) {
          ifExist = true
          return
        } else {
          ifExist = false
        }
      }
    } else {
      ifExist = false
    }

    if (ifExist === false) {
      skillsList[skill.name].push(skill.value)
      commit('SET_USER_SKILLS', skillsList)
    }
  },
  saveUserSkills({
    getters
  }) {
    let newSkills = utils.createClone(this.getters.getUserSkills);
    newSkills = utils.formatToString(newSkills);
    newSkills.Language = getters.getSelectedCvLang.toUpperCase();
    let url = "UserSkills(UserAlias='" + newSkills.UserAlias + "',Language='" + newSkills.Language + "')";
    let sToken = getters.getToken;
    let cookie = getters.getCookie; 
    axios({
        url: url,
        method: 'put',
        data: newSkills,
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
  saveUserLangs({getters}, data) {
    let sToken = getters.getToken;
    let cookie = getters.getCookie;
    data.Lang = getters.getSelectedCvLang;
    data.UserId = 'UIO';
    let url = 'UserLang';
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
  updateUserLangs({getters}, data){
    let sToken = getters.getToken;
    let cookie = getters.getCookie;
    if(getters.getSelectedCvLang) {
      data.Lang = getters.getSelectedCvLang.toUpperCase();
    } else {
      data.Lang = getters.getLoginLanguage;
    }
    let url = "UserLang(UserId='" + data.UserId + "',Lang='" + data.Lang + "',LanguageId='" + data.LanguageId + "')";
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
  addLanguageSkillsRow({
    commit,
    getters
  }) {
    const langList = getters.getUserLanguages
    langList.push({
      LanguageId: null,
      LangLevel: null
    })
    commit('SET_USER_LANGS', langList)
  },
  removeLanguageSkillsRow({
    commit,
    getters
  }, index) {
    const langList = getters.getUserLanguages
    langList.splice(index, 1)
    commit('SET_USER_LANGS', langList)
  },
  // get list of languages
  getAllLanguages({
    commit,
    getters
  }, ) {
    let urlQuery = getters.getUrlQuery
    axios({
      method: 'GET',
      url: 'Languages' + urlQuery,
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
      }
    }).then(res => {
      commit('SET_LANGUAGE_LIST', res.data.d.results);
    }).catch(error => {
      console.log(error)
    })
  }
}

const getters = {
  getUserSkills(state) {
    return state.userSkills
  },
  getUserLanguages(state) {
    return state.userLanguages
  },
  getFullLanguageList(state) {
    return state.fullLanguageList;
  },
}

export default {
  state,
  mutations,
  actions,
  getters
}
