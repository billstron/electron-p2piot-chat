import persistent from './persistent.js';
import RSA from 'node-rsa';

const storage = persistent();
let credentials = null;

function Factory() {
  const self = {
    get uid() {
      return storage.get('uid') || null;
    },
    set uid(uid) {
      storage.set('uid', uid);
    },
    get certificate() {
      return storage.get('certificate') || null;
    },
    set certificate(cert) {
      storage.set('certificate', cert);
    },
    get publicKey() {
      const cert = storage.get('certificate');
      if (cert === null || cert.length === 0) {
        return null;
      }
      const key = new RSA(cert);
      return key.exportKey('public');
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
