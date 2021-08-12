import Vue from "vue";
import Vuex from "vuex";
//then you use Vuex
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        searchRequest: window.localStorage.getItem('searchRequest'),
        searchResult : window.localStorage.getItem('searchResult')
    },

    mutations: {
        SearchRequest: (state, value) => {
            state.searchRequest = value;
            window.localStorage.setItem('searchRequest', value);
        },
        SearchResult: (state, value) => {
            state.searchResult = value;
            window.localStorage.setItem('searchResult', value);
        },
    },

    getters: {
        searchRequest: state => {
            return state.searchRequest;
        },
        searchResult: state => {
            return state.searchResult;
        },
    },

    actions: {
    },
});