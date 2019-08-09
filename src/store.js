import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
  		status: '',
  		token: localStorage.getItem('token') || '',
        user : {},
        role : localStorage.getItem('role') || '',
        // info : localStorage.getItem('role') || '',  
	},
	mutations: {
		auth_request(state){
	    	state.status = 'loading'
	  	},
	  	auth_success(state, token, user, rull){
		    state.status = 'success'
		    state.token = token
            state.user = user
            state.role = rull
	  	},
	  	auth_error(state){
	    	state.status = 'error'
	  	},
	  	logout(state){
	    	state.status = ''
            state.token = ''
            state.role = ''
	  	},
	},
	actions: {
	  	login({commit}, user){
	        return new Promise((resolve, reject) => {
	            commit('auth_request')
	            axios({url: process.env.VUE_APP_ROOT_API +'/login', data: user, method: 'POST' })
	            .then(resp => {
					console.log(resp, resp.data.roles[0]);
	                const token = resp.data.access_token
                    let user = resp.data.roles[0]
                    // resp.data.roles.forEach(rl =>{
                    //     const role = rl
                    // })
                    const rull = resp.data.roles[0];
                        // console.log(lengkapi, this.role)
                    localStorage.setItem('token', token)
                    localStorage.setItem('role', resp.data.roles[0])
	                // Add the following line:
	                axios.defaults.headers.common['Authorization'] = token
	                commit('auth_success', token, user, rull)
	                resolve(resp)
	            })
	            .catch(err => {
	                commit('auth_error')
	                localStorage.removeItem('token')
	                reject(err)
	            })
	        })
        },
	    register({commit}, user){
	    	return new Promise((resolve, reject) => {
	            commit('auth_request')
	            axios({url: 'http://localhost:3000/register', data: user, method: 'POST' })
	            .then(resp => {
	                const token = resp.data.token
	                const user = resp.data.user
	                localStorage.setItem('token', token)
	                // Add the following line:
	                axios.defaults.headers.common['Authorization'] = token
	                commit('auth_success', token, user)
	                resolve(resp)
	            })
	            .catch(err => {
	                commit('auth_error', err)
	                localStorage.removeItem('token')
	                reject(err)
	            })
	        })
	    },
	  	logout({commit}){
		    return new Promise((resolve, reject) => {
		      	commit('logout')
                  localStorage.removeItem('token')
                  localStorage.removeItem('role')
		      	delete axios.defaults.headers.common['Authorization']
		      	resolve()
		    })
	  	}
	},
	getters : {
	  isLoggedIn: state => !!state.token,
      authStatus: state => state.status,
      authRole: state => state.role,
	}
})
