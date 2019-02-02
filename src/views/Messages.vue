<template>
  <div class="messages">
    <h2>{{uid}}</h2>
    <div class="message-list">
      <ul>
        <li
          v-for="message in messages"
          :key="message.id"
        >
        </li>
      </ul>
    </div>
    <div class="message--controls">
      <textarea class="to-send" v-model="toSend" />
      <button v-on:click="sendMessage">Send</button>
    </div>
  </div>
</template>

<style lang="scss">
div.messages {
  float: left;
  width: 80%;

  div.message--controls {
    width: 100%;
    float: left;
    textarea {
      width: 100%;
      float: left;
      height: 3rem;
    }
    button {
      float: left;
    }
  }

  div.message-list {
    ul {
      list-style: none;
    }
  }
}
</style>

<script>
import Factory from '../models/messages';
const messages = Factory();

export default {
  name: 'messaage-list',
  props: [
    'uid',
  ],
  watch: {
    uid: (newVal) => {
      const list = messages.list.filter(({ uid }) => uid === newVal);
      this.messages = list;
    }
  },
  data: () => ({
    messages: [],
    toSend: '',
  }),
  methods: {
    sendMessage() {
      messages.send(this.uid, this.toSend);
      this.toSend = '';
    },
  },
  created() {
    const vm = this;
    messages.on('incoming', () => {
      vm.$emit('update:messages')
    })
  }
}
</script>
