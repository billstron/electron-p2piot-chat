import EventEmitter from 'events';
import Persistent from './persistent';
import Network from './network';

function Factory() {
  const storage = Persistent();
  const network = Network();

  const list = storage.get('messages') || [];

  const self = {
    get list() {
      return [...list];
    },
    set list(l) {
      throw new Error('not allowed');
    },

    send(uid, text) {
      const msg = { uid, direction: 'outgoing', text, received: false, time: (new Date()).toISOString() };
      list.push(msg);
      storage.set('messages', list);
      network.sendMessage(uid, { text })
        .then(() => {
          msg.received = true;
        })
        .catch((err) => {
          console.error(err);
        });
      return self;
    }
  };

  network.on('message', (uid, body) => {
    list.push({ uid, direction: 'incoming', text: body.text, received: true, time: (new Date()).toISOString() });
    storage.set('messages', list);
    self.emit('incoming');
  });

  return Object.assign(self, EventEmitter.prototype);
}

let messages = null;
export default function() {
  if (messages === null) {
    messages = Factory();
  }

  return messages;
}
