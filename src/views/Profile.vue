<template>
  <div class="profile">
    <h1>My Profile</h1>
    <input type="text" v-model="uid"/>
    <button v-on:click="setUid">Set UID</button>
    <textarea class="certificate" v-model="certificate" />
    <button v-on:click="setCertificate">Set Cert</button>
  </div>
</template>

<style lang="scss">
div.profile {
  input[type="text"] {
    width: 100%;
  }
  button {
    float: left;
  }
  textarea {
    width: 100%;
    height: 5rem;
  }
}

</style>

<script>
import persistent from '../models/persistent';
const model = persistent();

export default {
  name: 'profile',
  data: () => ({
    uid: '',
    publicKey: '',
    certificate: '',
  }),
  methods: {
    setUid() {
      model.set('uid', this.uid);
    },
    setPrivateKey() {
      this.data.publicKey = 'butts';
      model.set('certificate', this.certificate);
    }
  },
  created() {
    this.uid = model.get('uid') || '';
    this.certificate = model.get('certificate') || '';
    this.publicKey = '';
  },
};
</script>
