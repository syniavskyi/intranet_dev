import axios from 'axios'

const state = {
  emails: [],
  email: '',
  mail: '',
  emailExists: false,
  registrationError: false
};

const mutations = {
  SET_EMAILS(state, data) {
    state.emails = data;
  },
  SET_PREFIX_EMAIL(state, data) {
    state.email = data;
  },
  SET_EMAIL_EXISTS(state, data) {
    state.emailExists = data;
  },
  SET_MAIL(state, data) {
    state.mail = data;
  },
  SET_REGISTRATION_ERROR(state, isError) {
    state.registrationError = isError
  }
};

const actions = {
  checkEmail({
    commit,
    state,
  }, props) {
    axios.get('/api/emailList').then(res => {
      const data = res.data,
        aData = [];

      for (let key in data) {
        const email = data[key];

        email.email = data[key].email;
        aData.push(email.email);
      }
      commit('SET_EMAILS', aData);
      if (state.emails.length > 0) {
        var bIsEmail;

        for (var i = 0; i < state.emails.length; i++) {
          if (props.fullNameToEmail === state.emails[i]) {
            bIsEmail = true;
            break;
          } else {
            bIsEmail = false;
            commit('SET_MAIL', props.mail);
          }
        }
        commit('SET_EMAIL_EXISTS', bIsEmail);
      }
    });
  },
  fullNameToEmail({
    commit
  }, data) {
    var sEmail = data.name.replace(" ", ".").toLowerCase(),
      sDomain = "@btech.pl",
      sReturnEmail;

    data.name === "" ? (sDomain = "") : (sReturnEmail = sEmail + sDomain);
    data.email = sReturnEmail
    commit('SET_PREFIX_EMAIL', data.email);
  },
  submitRegistration({
    commit
  }, data) {
    data.openDialog = true;
    commit('OPEN_DIALOG', data.openDialog);
    data.role = 'ROLE_' + data.role.toUpperCase();
    axios.post('/api/register', {
      username: data.name,
      password: data.password,
      passwordConfirmation: data.password,
      email: data.mail,
      roles: [data.role],
      deps: [data.department]
    }).then(function (response) {
      commit('SET_REGISTRATION_ERROR', false)
    }).catch(function (error) {
      commit('SET_REGISTRATION_ERROR', false)
    })
  },
};

const getters = {
  getEmails(state) {
    return state.emails;
  },
  getPrefixEmail(state) {
    return state.email;
  },
  getEmail(state) {
    return state.emailExists;
  },
  getMail(state) {
    return state.mail;
  },
  getRegistrationError(state) {
    return state.registrationError
  }
};

export default {
  state,
  mutations,
  actions,
  getters
}
