import persistent from './persistent.js';

const storage = persistent();

let friends = null;

function Factory() {
  const list = storage.get('friends') || [];

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
      return self;
    },

    remove(uid) {
      const item = list.find(i => i.uid === uid);
      if (!item) {
        throw new Error('uid not found');
      }
      list.spice(item.indexOf(item), 1);
      storage.set('friends', list);
      return self;
    }
  };

  return self;
}

export default function() {
  if (friends === null) {
    friends = Factory();
    return friends;
  }

  return friends;
}
