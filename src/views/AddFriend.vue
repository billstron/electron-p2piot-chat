<template>
  <sub-page
    class="add-friend"
    backLink="/"
    title="Add Friend"
  >
    <h2>UID</h2>
    <input type="text" v-model="uid"/>
    <h2>Public Key</h2>
    <textarea class="public-key" v-model="publicKey"></textarea>
    <button v-on:click="addFriend">Add Friend</button>
    <button v-on:click="cancel">Cancel</button>
  </sub-page>
</template>

<style lang="scss">
div.add-friend {
  h2 {
    float:left;
    width: 100%;
    text-align: left;
    font-size: 14px;
    margin-bottom: 0;
  }
  input, button, textarea {
    &:focus {
      outline: none;
    }
  }
  input[type="text"] {
    width: 100%;
    float: left;
  }
  button {
    float: left;
  }
  textarea.public-key{
    width: 100%;
    float: left;
    height: 5rem;
  }
}

</style>

<script>
import Friends from '../models/friends';
const friends = Friends();

export default {
  name: 'add-friend',
  data: () => ({
    uid: '',
    publicKey: '',
  }),
  methods: {
    addFriend() {
      const { uid, publicKey } = this;
      friends.add({ uid, publicKey });
      this.$router.go(-1);
    },
    cancel() {
      this.$router.go(-1);
    }
  }
};
</script>
