import persistent from './persistent.js';
import RSA from 'node-rsa';

const storage = persistent();
let credentials = null;

function Factory() {

  const store = {
    uid: storage.get('uid') || '',
    certificate: storage.get('certificate') || '',
    publicKey: null,
  };

  function setPublicKey() {
    if (store.certificate.length > 0) {
      const key = new RSA(store.certificate);
      store.publicKey = key.exportKey('public');
    } else {
      store.publicKey = '';
    }
  }
  setPublicKey();

  const self = {
    get uid() {
      return store.uid;
    },
    set uid(uid) {
      storage.set('uid', uid);
      store.uid = uid;
    },
    get certificate() {
      return store.certificate;
    },
    set certificate(cert) {
      storage.set('certificate', cert);
      store.certificate = cert;
      setPublicKey();
    },
    get publicKey() {
      return store.publicKey;
    },
    set publicKey(key) {
      throw new Error('not allowed');
    }
  };
  return self;
}

export default function() {
  if (credentials === null) {
    credentials = Factory();
  }

  return credentials;
}
