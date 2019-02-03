<template>
  <div class="home">
    <friend-list id="friends" v-bind:select="select"/>
    <messages id="messages" v-bind:uid="uid"/>
  </div>
</template>

<style lang="scss">
div.home {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: 100%;
  grid-template-areas: "friends messages";

  #friends {
    grid-area: friends;
  }

  #messages {
    grid-area: messages;
  }
}
</style>

<script>
// @ is an alias to /src
import FriendList from './FriendList'
import Messages from './Messages'

export default {
  name: 'home',
  components: {
    FriendList,
    Messages,
  },
  data: () => ({
    uid: null,
  }),
  methods: {
    select(uid) {
      this.uid = uid;
    }
  }
}
</script>
