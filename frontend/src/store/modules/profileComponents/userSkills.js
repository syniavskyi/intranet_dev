const state = {
    userSkills: {
        SapModules: [],
        ProgramLang: [],
        Technologies: [],
        Extensions: [],
        AdditionalSkills: []
    },
    userLanguages: [
        {Language:'EN',  LangLevel: 'C1'},
        // {language: 'DE',  langLevel: 'A1'}
    ]
}

const mutations = {
    SET_USER_SKILLS(state, list) {
        state.userSkills = list
    },
    SET_USER_LANGS(state,list) {
        state.userLanguages = list
    }
}

const actions = {
    addModuleForSkills({commit,getters}, moduleId) {
        const skillsList = getters.getUserSkills,
              modules = skillsList.SapModules
         
        let moduleExist = null
    
        if (modules.length !== 0) {
          for (let i = 0; i < modules.length; i++) {
            if (modules[i] === moduleId) {
                moduleExist =  true
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
    
    addSkill({commit,getters}, skill) {
        const skillsList = getters.getUserSkills,
            list = skillsList[skill.name]
         
        let ifExist = null
    
        if (list.length !== 0) {
          for (let i = 0; i < list.length; i++) {
            if (list[i] === skill.value) {
                ifExist =  true
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
    saveUserSkills(){

    },
    addLanguageSkillsRow({
        commit,
        getters
      }) {
        const langList = getters.getUserLanguages
        langList.push({
            language: null,
            langLevel: null
        })
        commit('SET_USER_LANGS', langList)
    },
    removeLanguageSkillsRow({
        commit,
        getters
      }, index){
        const langList = getters.getUserLanguages
        langList.splice(index, 1)
        commit('SET_USER_LANGS', langList)
    },
    adjustUserSkills({getters, commit}) {
        const userSkills = getters.getUserSkills;
        var adjustedSkills = {
            AdditionalSkills: [],
            Extensions: [],
            ProgramLang: [],
            SapModules: [],
            Technologies: []
        };
        let index;
        let string;

        for(let key in adjustedSkills) {
            if(userSkills[0][key].includes('||')) {
                while(userSkills[0][key].length > 1) {
                    index = userSkills[0][key].indexOf('||');
                    if(userSkills[0][key].indexOf('||') > 0) {
                        string = userSkills[0][key].slice(0, index)
                        adjustedSkills[key].push(string);
                        index += 2;
                        userSkills[0][key] = userSkills[0][key].substr(index, userSkills[0][key].length)
                    } 
                    else {
                        adjustedSkills[key].push(userSkills[0][key]);
                         userSkills[0][key] = "";
                    }
                } 
            }  
            else {
                adjustedSkills[key].push(userSkills[0][key]);
            }
        }
        commit('SET_USER_SKILLS', adjustedSkills); 
    },
    adjustLang({getters, commit}) {
        const lang = getters.getUserLanguages;
        console.log(lang);
        let selectList = [];
        for(let i = 0; i < lang.length; i++) {
            let select = new Object;
            select.Language = lang[i].Language;
            select.LangLevel = lang[i].LangLevel;
            selectList.push(select);
        }
        commit('SET_USER_LANGS', selectList)
    }
}
 
const getters = {
    getUserSkills(state) {
        return state.userSkills
    },
    getUserLanguages(state){
        return state.userLanguages
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}