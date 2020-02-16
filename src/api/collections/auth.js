import { axiosInstance } from '../../boot/axios'

export default {
  login: (state, payload) => {
    axiosInstance.baseURL = state.user.baseUrl
    return axiosInstance.post(state.user.baseUrl + '/api/login', payload)
  },

  /**
   * {
    "username":"newuser vishwas",
    "email":"bhushan@imaginea.com",
    "publickey" : "0x4b9ee8840b254bf1ec45df7802585042ac8b7f45",
    "companyid" : "playground"
    }
  */
  registration: (state, payload) => {
    console.log(state)
    axiosInstance.baseURL = state.user.baseUrl
    return axiosInstance.post(state.user.baseUrl + '/register', payload)
  }

}
