import Vue from 'vue'
import Vuex from 'vuex'
import login from './modules/login'
import registration from './modules/registration'

Vue.use(Vuex);

// /const store =
export default new Vuex.Store({
    modules: {
        login,
        registration
    }
});