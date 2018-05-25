// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueAxios from 'vue-axios'
import axios from 'axios'
import Vuelidate from 'vuelidate'
import Vuex from 'vuex'
import Icon from 'vue-awesome/icons'
import i18n from './lang/lang'
import store from './store/store'
import VCalendar from 'v-calendar';
import 'v-calendar/lib/v-calendar.min.css';

Vue.use(Vuelidate)
Vue.use(Vuex)
Vue.use(VueAxios, axios)
Vue.use(VCalendar, {
    firstDayOfWeek: 2,
    locale: 'pl-PL'
});

Vue.component('icon', Icon)

require('./assets/styles/style.css');
require('./assets/styles/shared.css');
require('./assets/styles/login/login.css');
require('./assets/styles/profile/profile.css');
require('./assets/styles/registration/registration.css');
require('./assets/styles/dashboard/dashboard.css');
require('./assets/styles/starterPage/starterPage.css');
require('./assets/styles/availability/availability.css');
require('./assets/styles/employees/employees.css');

Vue.config.productionTip = false

axios.defaults.baseURL = 'https://btech-intranet.herokuapp.com/';
// axios.defaults.baseURL = 'http://10.0.2.6:8080/';
// axios.defaults.baseURL = 'https://btech-intranet.herokuapp.com/';
// axios.defaults.baseURL = 'http://10.0.2.5:8080/';
// axios.defaults.baseURL = 'http://192.168.8.107:8080';

export const app = new Vue({
    el: '#app',
    router,
    store,
    i18n,
    components: {
        App
    },
    template: '<App/>',
    render: h => h(App)
})