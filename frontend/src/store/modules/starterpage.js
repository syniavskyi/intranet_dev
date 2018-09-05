import axios from 'axios'
import router from '@/router/index.js'

const state = {
  buttonState: false,
  docList: [],
  docStatus: [],
  userId: ''
}

const mutations = {
  CHECK_LIST(state, data) {
    state.buttonState = data;
  },
  GET_DOC_LIST(state, data) {
    state.docList = data;
  },
  GET_DOC_STATUS(state, data) {
    state.docStatus = data;
  },
  GET_USER_ID(state, data) {
    state.userId = data;
  }
}

const actions = {
  checkList({
    commit
  }, data) {
    var bState = false;

    for (var i = 0; i < data.listOfDoc.length; i++) {
      if (data.listOfDoc[i].status) {
        bState = false;
      } else {
        return commit('CHECK_LIST', true)
      }
      commit('CHECK_LIST', bState);
    }
  },
  checkStatus({commit, getters}, data) {
      let newUserFiles = this.getters.getnewUserFilesList;
      for(let i = 0; i < newUserFiles.length; i++) {
        if(newUserFiles[i].Status === 'X') {
          newUserFiless[i].Status = true;
        }
        else {
          newUserFiles[i].Status = false;
        }
      }
      commit('SET_NEW_USER_FILES_LIST', newUserFiles);
  },
getDocs({commit, getters}) {
  let urlQuery = getters.getUrlQuery
  axios({
    method: 'GET',
    url: 'Attachments'  + urlQuery + "&$filter=FileId eq 'new'",
    headers: {
      "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
    }
  }).then(res => {
    let oAttachments = res.data.d.results;
    commit('GET_DOC_LIST', oAttachments);
  }).catch(error => {
    console.log(error);
  })
  },
  
  getDocsStatus({
    commit,
    state
  }) {
    var URL = '/api/users/' + state.userId + '/userStarterPage';
    axios.get(URL).then(res => {
      const data = res.data,
        aData = [];

        for(let key in data) {
          const docStatus = data[key];

          aData.push(docStatus);
        }
        commit('GET_DOC_STATUS', aData);
    })
  },
  saveDocs({commit, state, dispatch}, data) {
    var URL = '/api/users/' + state.userId + '/userStarterPage/create';
    axios.post(URL, {
      userGroup: "WRK",
      docId: data.data.id,
      status: data.data.status
    }).then(function(response){
      console.log(response);
      dispatch("getDocsStatus");
    }).catch(function(error) {
      console.log(error);
    });
  },
  sentDocuments({commit, state}){
    let formData = new FormData();

    formData.append('id', state.userId);
    axios({
      method: 'post',
      url: 'api/users/userStarterPage/disableStarterPage',
      headers: { "Content-type": "multipart/form-data" },
      data: formData
  }).then(res => {
      console.log(res)
      router.replace('/dashboard')
  }).catch(error => {
      console.log(error)
  })
  }
}

const getters = {
  returnCheckList(state) {
    return state.buttonState;
  },
  docLists(state) {
    return state.docList;
  },
  docStatusList(state) {
    return state.docStatus;
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
