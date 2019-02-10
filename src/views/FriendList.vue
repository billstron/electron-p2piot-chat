<template>
  <div class="friends">
    <div id="friends--header">
      <h3>Contacts</h3>
    </div>
    <div id="friends--list">

      <ul>
        <li
          v-for="friend in friends"
          :key="friend.uid"
        >
          <a
            v-on:click="selectFriend(friend)"
            v-bind:class="classObject(friend)"
          >
            <span class="online-indicator" v-bind:class="[friend.online ? 'online' : 'offline']"/>
            {{ friend.uid }}
          </a>
        </li>
      </ul>
    </div>
    <div id="friends--controls">
      <a class="button" v-on:click="showProfile">
        <font-awesome-icon icon="cog" />
      </a>
      <a class="button" v-on:click="addFriend">
        <font-awesome-icon icon="user-plus" />
      </a>
      <a class="button" v-on:click="showAbout">
        <font-awesome-icon icon="info" />
      </a>
    </div>
  </div>
</template>

<style lang="scss">
div.friends {
  width: 200px;

  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:  "friendsHeader"
                        "friendsList"
                        "friendsActions";

  background-color: #f6f6f6;
  border: 1px solid #dedede;

  #friends--header {
    grid-area: friendsHeader;
    h3 {
      margin: 0;
      padding: 5px 0 0 20px;
      text-align: left;
    }
    border-bottom: 1px solid #dedede;
  }

  #friends--list {
    grid-area: friendsList;
    overflow-y: auto;

    ul {
      list-style: none;
      display: block;
      width: 100;
      margin: 0;
      padding: 0;

      li {
        width: 100%;
        border-bottom: 1px solid #dedede;

        a {
          padding: 5px 5px 5px 40px;
          display: block;
          text-align: left;
        }
        a:hover {
          background-color: #f0f0f0;
        }
        a.active {
          background-color: #4a94f4;
          color: white;

          .online-indicator {
            border-color: white;

            &.online {
              background-color: white;
            }
          }
        }

        .online-indicator {
          display: inline-block;
          border: 1px solid #2c3e50;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          margin-right: 3px;

          &.online {
            background-color: #2bac76;
            border-color: #2bac76;
          }
        }
      }
    }
  }

  #friends--controls {
    grid-area: friendsActions;
    text-align: left;
    background-color: #f0f0f0;

    a.button {
      display: inline-block;
      color: #2c3e50;
      padding: 7px 0;
      font-size: 24px;
      width: 33.33%;
      text-align: center;

      &:hover {
        color: white;
        background-color: #4a94f4;
      }
    }
  }
}
</style>

<script>
import Friends from '../models/friends';
import Persistent from '../models/persistent';
const friends = Friends();
const store = Persistent();

export default {
  name: 'friend-list',
  props: [
    'select',
  ],
  data: () => ({
    friends: [],
    selected: null,
  }),
  methods: {
    addFriend() {
      this.$router.push('/add-friend');
    },
    showProfile() {
      this.$router.push('/profile');
    },
    showAbout() {
      this.$router.push('/about');
    },
    selectFriend(friend) {
      this.select(friend);
      this.selected = friend.uid;
      store.set('friend-list.selected', this.selected);
    },
    classObject(friend) {
      return {
        active: friend.uid === this.selected,
      };
    },
  },
  created() {
    const vm = this;
    this.friends = friends.list;
    let uid = store.get('friend-list.selected');
    let friend;
    if (!uid && this.friends.length > 0) {
      friend = this.friends[0];
    } else {
      friend = this.friends.find(friend => friend.uid === uid);
    }
    this.selectFriend(friend);
    friends.on('updated', () => {
      vm.friends = friends.list;
    });
  }
}
</script>
