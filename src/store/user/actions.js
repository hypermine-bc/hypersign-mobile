import { Notify } from 'quasar'

export function setBaseUrl ({ state, commit, rootState, dispatch }, params) {
  commit('UPDATE_BASEURL', params)
}
export function authenticate ({ state, commit, rootState, dispatch }, value) {
  return new Promise((resolve, reject) => {
    let password = state.password
    let res = password === value
    if (res) {
      dispatch('wallet/generatePvtKeyFromSeed', password, { root: true })
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    } else {
      Notify.create({
        classes: 'text-weight-bold text-center',
        color: 'negative',
        position: 'top-right',
        message: 'Your credentials did not match.'
      })
      reject(true)
    }
  })
}
