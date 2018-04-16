// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueAxios from 'vue-axios'
import VueAuthenticate from 'vue-authenticate'
import axios from 'axios'
import Vuelidate from 'vuelidate'
import Vuex from 'vuex'

// import { store } from './store/store'
import store from './store/store'

Vue.use(Vuelidate);
Vue.use(Vuex);
Vue.use(VueAxios, axios);
Vue.use(VueAuthenticate, {});

require('./assets/styles/style.css');
require('./assets/styles/shared.css');
// require('./assets/styles/login.css')
require('./assets/styles/login/login.css');
require('./assets/styles/registration/registration.css');

Vue.config.productionTip = false

axios.defaults.baseURL = 'https://btech-intranet.herokuapp.com';
// axios.defaults.baseURL = 'http://10.0.2.8:8080/';

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: {
        App
    },
    template: '<App/>'
})