<template>
  <sub-page
    class="profile"
    backLink="/"
    title="My Profile"
  >
    <h2>UID</h2>
    <input type="text" v-model="uid"/>
    <button v-on:click="setUid">Set UID</button>
    <h2>Public Key (read only)</h2>
    <textarea class="public-key" v-model="publicKey" readonly></textarea>
    <h2>Certificate (keep secret)</h2>
    <textarea class="certificate" v-model="certificate" />
    <button v-on:click="setCertificate">Set Cert</button>
  </sub-page>
</template>

<style lang="scss">
div.profile {
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
  textarea{
    width: 100%;
    float: left;
    &.public-key {
      height: 5rem;
      cursor: default;
    }
    &.certificate {
      height: 13rem;
    }
  }
}
</style>

<script>
import Credentials from '../models/credentials';
const creds = Credentials();

export default {
  name: 'profile',
  data: () => ({
    uid: '',
    publicKey: '',
    certificate: '',
  }),
  methods: {
    setUid() {
      creds.uid = this.uid;
    },
    setCertificate() {
      creds.certificate = this.certificate;
      this.publicKey = creds.publicKey;
    }
  },
  created() {
    this.uid = creds.uid;
    this.certificate = creds.certificate;
    this.publicKey = creds.publicKey;
  },
};
</script>
