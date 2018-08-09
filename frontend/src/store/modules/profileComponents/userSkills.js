const state = {
    userSkills: {
        SapModules: [
            'FI', 'MM'
        ],
        ProgramLang: [
            'JavaScript', 'ABAP'
        ],
        Technologies: [
            "SAPUI5", "OData", "SAP Gateway", "RFC"
        ],
        Extensions: [
            "BADI", "Enhancement Points", "OData Extension"
        ],
        AdditionalSkills: [
            "Autoryzacja", "Role użytkowników"
        ]
    }

}

const mutations = {
    SET_USER_SKILLS(state, list) {
        state.userSkills = list
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
}
 
const getters = {
    getUserSkills(state) {
        return state.userSkills
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}