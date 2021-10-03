import { login, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
    state: {
        token: getToken(),
        roles: [],
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        },
    },
    actions: {
        Login({ commit }, formData) {
            return new Promise((resolve, reject) => {
                login(formData).then(response => {
                    const data = response.data
                    setToken(data)
                    commit('SET_TOKEN', data)
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },
        GetInfo({ commit, state }) {
            return new Promise(async (resolve, reject) => {
                let res = await getInfo()
                console.log(res, 'GetInfo')
            })
        }
    }
}

export default user