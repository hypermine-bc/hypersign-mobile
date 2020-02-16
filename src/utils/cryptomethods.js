/**
 * Create Key pair creates an ECDSA Key pai
 * Using CUrve SECP256k1
 */
export function createKeyPair(randomkey,password,name) {
    console.log(randomkey,password)
    return {
        public: 'Key1',
        private: 'kjkhkjhhwrty1233',
        name:name
    }

};

export function signMessage(message, privKey) {
    return '';
}