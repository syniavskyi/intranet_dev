import axios from 'axios'
import router from '@/router/index.js'

const state = {
    buttonState: false,
    docList: []
}

const mutations = {
    CHECK_LIST(state, data) {
        state.buttonState = data;
    },
    GET_DOC_LIST(state, data) {
        state.docList = data;
    }
}

const actions = {
    checkList({commit}, data) {
        var bState = false;

        for(var i = 0; i < data.listOfDoc.length; i++) {
            if(data.listOfDoc[i].checked) {
                bState = false;
            } else {
                return commit('CHECK_LIST', true)
            }
            commit('CHECK_LIST', bState);
        }
    },
    getDocs({commit}) {
        axios.get('/api/documentsList').then(res =>{
            const data = res.data,
                aData = [];

                console.log(data);
                for(let key in data) {
                    const doc = data[key];

                    aData.push(doc);
                }
            commit('GET_DOC_LIST', aData);
        });
    }
}

const getters = {
    returnCheckList(state) {
        return state.buttonState;
    },
    docLists(state) {
        return state.docList;
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}