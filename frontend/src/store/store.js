import Vue from 'vue'
import Vuex from 'vuex'
import login from './modules/login'
import registration from './modules/registration'

Vue.use(Vuex);

export const store = new Vuex.store({
    modules: {
        login,
        registration
    }
});