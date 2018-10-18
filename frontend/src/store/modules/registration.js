import axios from 'axios'

const actions = {
  submitRegistration({
    commit, getters
  }, data) {
    let url = 'Users'
    let sToken = getters.getToken;
    let cookie = getters.getCookie;
    data.Action = "R";
    commit("SET_DIALOG_CONFIRM", true);
    commit("SET_DISPLAY_LOADER", true);
    axios({
      url: url,
      data: data,
      method: 'post',
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        "Cache-Control": "no-cache",
        "x-csrf-token": sToken,
        "Cookie": cookie
      }
    }).then(res => {
      commit("SET_DISPLAY_LOADER", false);
      commit("SET_DIALOG_CONFIRM", true);
    }).catch(error => {
      commit("SET_DISPLAY_LOADER", false);
      commit("SET_DIALOG_ERROR_STATUS", true);
    })
  },

  closeConfirmDialog({
    commit
  }){
    commit("SET_DIALOG_CONFIRM", true);
  }
};


export default {
  actions
}
