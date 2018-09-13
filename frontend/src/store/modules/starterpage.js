import axios from 'axios'
import router from '@/router/index.js'

const state = {
  buttonState: false,
  docListNew: [],
  docListInfo: [],
  listForStatus: [],
}

const mutations = {
// check if all documents are filled
  SET_BUTTON_STATE(state, data) {
    state.buttonState = data;
  },
  // docs for new user
  SET_DOC_LIST_NEW(state, data) {
    state.docListNew = data;
  },
  // informational documents
  SET_DOC_LIST_INFO(state, data) {
    state.docListInfo = data;
  },
}

const actions = {
  checkList({
    commit
  }, data) {
    var bState = false;

    for (var i = 0; i < data.length; i++) {
      if (data[i].Status) {
        bState = false;
      } else {
        return commit('SET_BUTTON_STATE', true)
      }
      commit('SET_BUTTON_STATE', bState);
    }
  },
  checkStatus({commit, getters}, files) {
    for(let i = 0; i < files.length; i++) {
      if(files[i].Status === 'X') {
        files[i].Status = true;
      }
      else {
        files[i].Status = false;
      }
    }
},
getNewDocs({commit, getters, dispatch}) {
    let urlQuery = getters.getUrlQuery
    // halo Marysia podpięłam tu, żeby za każdym razem się nie wylogowywać, nie wiedziałam czy wrzucić to do loadData, więc tak zostało
    let query = "?sap-user=psy&sap-password=ides01&sap-language=pl"
    let user = 'UIO'
    axios({
      method: 'GET',
      url: 'Attachments'  + query + "&$filter=FileId eq 'new' and UserAlias eq '" + user + "'",
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
      }
    }).then(res => {
      let oAttachments = res.data.d.results;
      commit('SET_DOC_LIST_NEW', oAttachments);
      dispatch('checkStatus', oAttachments);
    }).catch(error => {
      console.log(error);
    })
  },
  getInfoDocs({commit, getters, dispatch}) {
    let urlQuery = getters.getUrlQuery
    let query = "?sap-user=psy&sap-password=ides01&sap-language=pl"
    let user = 'UIO'
    axios({
      method: 'GET',
      url: 'Attachments'  + query + "&$filter=FileId eq 'info' and UserAlias eq '" + user + "'",
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
      }
    }).then(res => {
      let oAttachments = res.data.d.results;
      commit('SET_DOC_LIST_INFO', oAttachments);
      dispatch('checkStatus', oAttachments);
    }).catch(error => {
      console.log(error);
    })
  },

}

const getters = {
  getButtonState(state) {
    return state.buttonState;
  },
  getDocListNew(state) {
    return state.docListNew;
  },
  getDocListInfo(state) {
    return state.docListInfo;
  },
  getListForStatus(state) {
    return state.listForStatus;
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
