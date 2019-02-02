import Persistent from './persistent.js';
import Network from './network';
import RSA from 'node-rsa';

function Factory() {

  const storage = Persistent();
  const network = Network();

  const store = {
    uid: null,
    certificate: null,
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

  const self = {
    get uid() {
      return store.uid;
    },
    set uid(uid) {
      storage.set('uid', uid);
      store.uid = uid;
      if (store.certificate) {
        network.setSelf(store.uid, store.certificate);
      }
    },
    get certificate() {
      return store.certificate;
    },
    set certificate(cert) {
      storage.set('certificate', cert);
      store.certificate = cert;
      setPublicKey();
      if (store.uid) {
        network.setSelf(store.uid, store.certificate);
      }
    },
    get publicKey() {
      return store.publicKey;
    },
    set publicKey(key) {
      throw new Error('not allowed');
    }
  };

  self.uid = storage.get('uid') || '';
  self.certificate = storage.get('certificate') || '';
  setPublicKey();
  return self;
}

let credentials = null;

export default function() {
  if (credentials === null) {
    credentials = Factory();
  }

  return credentials;
}
