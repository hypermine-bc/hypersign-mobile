// import yoethwallet from 'yoethwallet'
import { Notify } from 'quasar'
import lightwallet from 'eth-lightwallet'
// import auth from '../../api/collections/auth'
import { createKeyPair } from '../../utils/cryptomethods.js'
import tx from '../../api/collections/tx'

export function generate ({ state, commit, rootState, dispatch }, value) {
  return new Promise((resolve, reject) => {
   
    let name = value.name

    if (!name) {
      Notify.create({
        classes: 'text-weight-bold text-center',
        color: 'negative',
        position: 'top-right',
        message: 'Your credentials are invalid.'
      })
      reject('Name is empty!')
    }

    let randomSeed = lightwallet.keystore.generateRandomSeed()
    let password = lightwallet.keystore.generateRandomSeed()

    let key = createKeyPair(randomSeed, password, name)
    commit('ADD_KEY', key)
    console.log(key)

  })
}

export function signMessageTx ({ state, commit, dispatch }, rawMsg) {
  return new Promise((resolve, reject) => {
    // debugger
    dispatch('scanQr', rawMsg)
      .then(rawTextFromQr => {
        if (state.keystore) {
          if (state.privateKey) {
            // code to remove later
            let signedMsgRSV = lightwallet.signing.signMsg(state.keystore, state.privateKey, rawTextFromQr, state.address[0])
            if (signedMsgRSV) {
              let apiObject = {}
              apiObject.rawMsg = rawTextFromQr
              apiObject.ksSessionId = signedMsgRSV
              apiObject.challenge = signedMsgRSV
              apiObject.signedRsv = signedMsgRSV
              apiObject.publickey = state.address
              apiObject.companyid = 'playground'
              tx
                .sign(apiObject)
                .then(res => {
                  if (res.data.status === 'SUCCESS') {
                    resolve(signedMsgRSV)
                  }
                })
            } else reject('Error : Error after singMsg call.')
          } else {
            reject('Error : state.privateKey is null or empty.')
          }
        } else {
          reject('Error : state.keystore is null or empty.')
        }
      })
  })
}

export function scanQr ({ state, commit }, rawMsg) {
  return new Promise((resolve, reject) => {
    // debugger
    if (cordova.plugins) {
      cordova.plugins.barcodeScanner.scan(
        function (result) {
          if (result.text !== '') {
            try {
              Notify.create({
                classes: 'text-weight-bold text-center',
                color: 'positive',
                position: 'top-right',
                message: 'Text on QR scan : ' + result.text
              })
              resolve(result.text)
            } catch (err) {
              Notify.create({
                classes: 'text-weight-bold text-center',
                color: 'negative',
                position: 'top-right',
                message: err
              })
            }
          }
        },
        function (error) {
          alert('Scanning failed: ' + error)
        },
        {
          preferFrontCamera: false, // iOS and Android
          showFlipCameraButton: true, // iOS and Android
          showTorchButton: true, // iOS and Android
          torchOn: false,
          prompt: 'Place a barcode inside the scan area', // Android
          resultDisplayDuration: 500
        }
      )
    } else {
      console.error('Error : cordova is not found')
      reject('Error : cordova is not found')
    }
  })
}
