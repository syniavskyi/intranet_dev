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

import store from './store/store'

Vue.use(Vuelidate);
Vue.use(Vuex);
Vue.use(VueAxios, axios);
Vue.use(VueAuthenticate, {});

require('./assets/styles/style.css')
require('./assets/styles/login.css')

Vue.config.productionTip = false

// axios.defaults.baseURL = '';

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