<template>
  <div class="friends">
    <div class="friends--controls">
      <button v-on:click="addFriend">Add Friend</button>
    </div>
    <div class="friends--list">
      <ul>
        <li
          v-for="friend in friends"
          :key="friend.uid"
        >
          <a v-on:click="selectFriend(friend.uid)">{{ friend.uid }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
div.friends {
  float: left;
  width: 20%;
  div.friends--controls {
    width: 100%;
  }

  div.friends--list {
    ul {
      list-style: none;
    }
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
  }),
  methods: {
    addFriend() {
      this.$router.push('/add-friend');
    },
    selectFriend(uid) {
      this.select(uid);
    }
  },
  created() {
    this.friends = friends.list;
  }
}
</script>
