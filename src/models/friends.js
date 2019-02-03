import EventEmitter from 'events';
import Persistent from './persistent';
import Network from './network';

function Factory() {
  const storage = Persistent();
  const network = Network();

  const list = storage.get('friends') || [];
  list.forEach((friend) => {
    network.addFriend(friend.uid, friend.publicKey);
    friend.online = false;
  });

  network.on('online', (uid, status) => {
    const friend = list.find(friend => friend.uid === uid);
    friend.online = status;
    self.emit('updated');
  });

  const self = {
    get list() {
      return [...list];
    },
    set list(l) {
      throw new Error('not allowed');
    },

    add({ uid, publicKey }) {
      list.push({ uid, publicKey });
      storage.set('friends', list);
      network.addFriend(uid, publicKey);
      this.emit('updated');
      return self;
    },

    remove(uid) {
      const item = list.find(i => i.uid === uid);
      if (!item) {
        throw new Error('uid not found');
      }
      list.spice(item.indexOf(item), 1);
      storage.set('friends', list);
      network.removeFriend(uid);
      this.emit('updated');
      return self;
    }
  };

  return Object.assign(self, EventEmitter.prototype);
}

let friends = null;
export default function() {
  if (friends === null) {
    friends = Factory();
    return friends;
  }

  return friends;
}
