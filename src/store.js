import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: ''
    },
    mutations: {
        getusername(state, n) {
            state.user = n
        }
    },
    actions: {
        mygetusername(get, n) {
            get.commit("getusername", n)
        }
    }
})