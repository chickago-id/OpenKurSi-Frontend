import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
  		status: "",
  		token: '',
        user : {},
        role : "",
        // info : localStorage.getItem('role') || '',  
	},
	mutations: {
		auth_request(state){
	    	state.status = 'loading'
	  	},
	  	auth_success(state, payload){
		    state.status = 'success'
            state.role = payload.role
		    state.token = payload.token
            state.user = payload.user
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
					const token = resp.data.access_token
                    let user = resp.data.roles[0]
                    // resp.data.roles.forEach(rl =>{
						//     const role = rl
						// })
					let atur = resp.data.roles[0];
					// console.log(atur);
					// let huu = JSON.stringify(atur)
                        // console.log(lengkapi, this.role)
                    localStorage.setItem('token', token)
                    localStorage.setItem('role', resp.data.roles[0])
	                // Add the following line:
	                axios.defaults.headers.common['Authorization'] = token
	                commit('auth_success', {
						token: token,
						user: user,
						role: atur 
					})
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
