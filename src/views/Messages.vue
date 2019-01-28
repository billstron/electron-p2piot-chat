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
    <div class="message-controls">

    </div>
  </div>
</template>

<style lang="scss">
div.messages {
  float: left;

  div.message--controls {
    width: 100%;
  }

  div.message-list {
    ul {
      list-style: none;
    }
  }
}
</style>

<script>

export default {
  name: 'messaage-list',
  props: [
    'uid',
  ],
  watch: {
    uid: (newVal, oldVal) => {
      console.log('uid chaged', newVal, oldVal);
    }
  },
  data: () => ({
    messages: [],
  }),
  methods: {
    sendMessage() {

    },
    selectFriend() {

    }
  },
  created() {
  }
}
</script>
