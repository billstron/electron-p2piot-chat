import p2piot from 'node-p2piot';
import EventEmitter from 'events'

const { client } = p2piot;

function factory() {
  const self = {
    net: null,

    friends: [],

    setup() {
      this.net.connect();

      this.net.once('connected', () => {
        this.emit('connected');
      });

      this.net.on('online', (uid, status) => {
        this.emit('online', uid, status);
      });

      this.net.router = function router(req, response) {
        const { route, method, body, uid } = req; // eslint-disable-line no-unused-vars
        switch (route) {
          case '/ping':
            return response(200, { msg: 'pong' });
          case '/message':
            this.emit('message', uid, body);
            return response(200, { msg: 'received' });
          default:
            return response(404, { msg: 'not found' });
        }
      };

      this.friends.forEach(({ uid, publicKey }) => {
        this.net.addFriend(uid, publicKey);
      });
    },

    setSelf(uid, privateKey) {

      const opts = {
        locationServer: 'http://34.238.60.160:3000',
        stunServer: {
          host: 'stun1.l.google.com',
          port: 19302,
        },
        privateKey,
      };

      this.net = client(uid, opts);
      this.setup();
    },

    addFriend(uid, publicKey) {
      this.friends.push({ uid, publicKey });
      if (this.net) {
        this.net.addFriend(uid, publicKey);
      }
    },

    removeFriend() {

    },

    sendMessage(uid, body) {
      return this.net.request(uid, { route: '/message', method: 'POST', body });
    },
  }

  return Object.assign(self, EventEmitter.prototype);
}

let network = null;
export default function() {
  if (network === null) {
    network = factory();
  }
  return network;
}
