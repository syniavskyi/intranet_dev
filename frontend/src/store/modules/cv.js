import axios from 'axios'

const state = {
    cvElements: {
        photo: true,
        address: true,
        phone: true,
        date:true,
        name: true,
        language: null,
        format: null,
        contractor: true,
        position: null
    }
};

const mutations = {
    SET_CV_ELEMENTS(state, data){
        state.cvElements = data
    }
};

const actions = {

    selectAllCvElements({getters, commit}) {
        let elements = getters.getCvElements,
            lang = elements.language,
            pos = elements.position,
            format = elements.format
        elements = {
                photo: true,
                address: true,
                phone: true,
                date:true,
                name: true,
                language: lang,
                format: format,
                contractor: true,
                position: pos
        }
        commit('SET_CV_ELEMENTS', elements);
    },
    deselectAllCvElements({getters, commit}) {
        let elements = getters.getCvElements,
        lang = elements.language,
        pos = elements.position,
        format = elements.format
        elements = {
                photo: false,
                address: false,
                phone: false,
                date:false,
                name: false,
                language: lang,
                format: format,
                contractor: false,
                position: pos
        }
        commit('SET_CV_ELEMENTS', elements);
    }
};

const getters = {
    getCvElements(state){
        return state.cvElements
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}