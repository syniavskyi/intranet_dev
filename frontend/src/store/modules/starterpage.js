import axios from 'axios'

const state = {
  buttonStateNew: true,
  buttonStateInfo: true,
  docListNew: [],
  docListInfo: [],
  listForStatus: [],
}

const mutations = {
  // check if all documents are filled
  SET_BUTTON_STATE_NEW(state, data) {
    state.buttonStateNew = data;
  },
  // docs for new user
  SET_DOC_LIST_NEW(state, data) {
    state.docListNew = data;
  },
  // informational documents
  SET_DOC_LIST_INFO(state, data) {
    state.docListInfo = data;
  },
  //doc info for new user
  SET_BUTTON_STATE_INFO(state, data) {
    state.buttonStateInfo = data;
  }
}

const actions = {
  // check if one of chheckboxes is not checked and set button to disabled
  checkListForNew({
    commit
  }, data) {
    var bState = false;
    for (var i = 0; i < data.length; i++) {
      if (data[i].Status) {
        bState = false;
      } else {
        return commit('SET_BUTTON_STATE_NEW', true)
      }
      commit('SET_BUTTON_STATE_NEW', bState);
    }
  },
  //same as above
  checkListForInfo({
    commit
  }, data) {
    var bState = false;
    for (var i = 0; i < data.length; i++) {
      if (data[i].Status) {
        bState = false;
      } else {
        return commit('SET_BUTTON_STATE_INFO', true)
      }
      commit('SET_BUTTON_STATE_INFO', bState);
    }
  },
  // change Status from X/- to true/false
  checkStatus({}, files) {
    for (let i = 0; i < files.length; i++) {
      files[i].Status = files[i].Status === 'X' ? true : false
    }
  },
  // get docs for new user
  getNewDocs({
    commit,
    getters,
    dispatch
  }) {
    let urlQuery = getters.getUrlQuery
    // TEMPORARY, after testing change url to urlQuery
    let query = "?sap-user=psy&sap-password=ides01&sap-language=pl"
    let user = 'UIO'
    axios({
      method: 'GET',
      url: 'Attachments' + query + "&$filter=FileId eq 'new' and UserAlias eq '" + user + "'",
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
  // get informational docs
  getInfoDocs({
    commit,
    getters,
    dispatch
  }) {
    let urlQuery = getters.getUrlQuery
    let query = "?sap-user=psy&sap-password=ides01&sap-language=pl"
    let user = 'UIO'
    axios({
      method: 'GET',
      url: 'Attachments' + query + "&$filter=FileId eq 'info' and UserAlias eq '" + user + "'",
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
  }
}

const getters = {
  getButtonStateNew(state) {
    return state.buttonStateNew;
  },
  getButtonStateInfo(state) {
    return state.buttonStateInfo
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
