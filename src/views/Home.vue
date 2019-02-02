<template>
  <div class="home">
    <FriendList v-bind:select="select"/>
    <Messages v-bind:uid="uid"/>
  </div>
</template>

<style lang="scss">
div.home {
  float: left;
  width: 100%;

  FriendList {
    float: left,
  }

  div.messages {

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
