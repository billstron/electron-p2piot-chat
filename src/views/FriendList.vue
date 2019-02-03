<template>
  <div class="friends">
    <div id="friends--header">
      <h3>Friends</h3>
    </div>
    <div id="friends--list">

      <ul>
        <li
          v-for="friend in friends"
          :key="friend.uid"
        >
          <a
            v-on:click="selectFriend(friend.uid)"
            v-bind:class="classObject(friend.uid)"
          >
            {{ friend.uid }}
          </a>
        </li>
      </ul>
    </div>
    <div id="friends--controls">
      <button v-on:click="addFriend">Add Friend</button>
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
        }
      }
    }
  }

  #friends--controls {
    grid-area: friendsActions;
  }
}
</style>

<script>
import Friends from '../models/friends';
const friends = Friends();
// @ is an alias to /src

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
    selectFriend(uid) {
      this.select(uid);
      this.selected = uid;
    },
    classObject(uid) {
      return {
        active: uid === this.selected,
      };
    },
  },
  created() {
    this.friends = friends.list;
  }
}
</script>
