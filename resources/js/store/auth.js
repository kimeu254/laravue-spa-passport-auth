import axios from 'axios'
import router from '@/router'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    namespaced: true,
    state:{
        authenticated:false,
        user:{}
    },
    getters:{
        authenticated(state){
            return state.authenticated
        },
        user(state){
            return state.user
        }
    },
    mutations:{
        SET_AUTHENTICATED (state, value) {
            state.authenticated = value
        },
        SET_USER (state, value) {
            state.user = value
        },
        CLEAR_USER_DATA () {
            localStorage.removeItem('my_token')
        },
    },
    actions:{
        async login({commit}, auth){
            try 
            {
                const { data } = await axios.post('/api/user/login', auth)
                localStorage.setItem("my_token", data.access_token)
                commit('SET_USER', data.user)
                commit('SET_AUTHENTICATED', true)
                toast.success(data.message, {
                    autoClose: 1000,
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            } 
            catch ({ response }) 
            {
                if (response.status === 401 && response.data && response.data.errors) {
                    let list = Object.values(response.data.errors)
                    list.forEach((value, index) => {
                        list.push(value);
                        toast.error(value, {
                            autoClose: 7000,
                            position: toast.POSITION.TOP_RIGHT,
                        });
                    });
                } else {
                    toast.error(response.data.message, {
                        autoClose: 7000,
                        position: toast.POSITION.TOP_RIGHT,
                    });
                }
                commit('SET_USER', {})
                commit('SET_AUTHENTICATED', false)
            }
        },

        async register({commit}, user){
            try 
            {
                const { data } = await axios.post('/api/user/register', user)
                localStorage.setItem("my_token", data.access_token)
                commit('SET_USER', data.user)
                commit('SET_AUTHENTICATED', true)
                router.push({name:'dashboard'})
                toast.success(data.message, {
                    autoClose: 1000,
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            } 
            catch ({ response }) 
            {
                if (response.status === 401 && response.data && response.data.errors) {
                    let list = Object.values(response.data.errors)
                    list.forEach((value, index) => {
                        list.push(value);
                        toast.error(value, {
                            autoClose: 7000,
                            position: toast.POSITION.TOP_RIGHT,
                        });
                    });
                } else {
                    toast.error(response.data.message, {
                        autoClose: 7000,
                        position: toast.POSITION.TOP_RIGHT,
                    });
                }
                commit('SET_USER', {})
                commit('SET_AUTHENTICATED', false)
            }
        },
        
        logout({commit}){
            commit('SET_USER',{})
            commit('SET_AUTHENTICATED',false)
            commit('CLEAR_USER_DATA')
        }
    }
}