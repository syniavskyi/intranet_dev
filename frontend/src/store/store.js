import Vue from 'vue'
import Vuex from 'vuex'
import login from './modules/login'
import registration from './modules/registration'
import dashboard from './modules/dashboard'
import shared from './modules/shared'
import profile from './modules/profile'
import employees from './modules/employees'


Vue.use(Vuex);

// const store = new Vuex.Store({
export default new Vuex.Store({
    modules: {
        login,
        registration,
        dashboard,
        shared,
        profile,
        employees

    }
});