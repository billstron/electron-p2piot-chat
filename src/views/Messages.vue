<template>
  <div class="messages">
    <div class="messages--header" v-if="friend">
      <span class="online-indicator" v-bind:class="[(friend.online) ? 'online' : 'offline']"/>
      {{ friend.uid }}
    </div>
    <div class="messages--list" ref="messageList">
      <ul>
        <li
          v-for="message in messages"
          :key="message.id"
          v-bind:class="[message.direction]"
        >
          {{ message.text }}
        </li>
      </ul>
    </div>
    <div class="messages--controls" v-if="friend">
      <textarea
        ref="toSend"
        class="to-send"
        v-model="toSend"
        v-on:keyup.enter="sendMessage"
      />
    </div>
  </div>
</template>

<style lang="scss">
div.messages {
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:  "messagesHeader"
                        "messagesList"
                        "messagesControls";

  div.messages--header {
    padding: 10px 5px 5px 20px;
    grid-area: messagesHeader;
    text-align: left;
    font-size: 18px;
    font-weight: bold;

    .online-indicator {
      display: inline-block;
      border: 1px solid #2c3e50;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      margin-right: 3px;
      line-height: 18px;

      &.online {
        background-color: #2bac76;
        border-color: #2bac76;
      }
    }
  }

  div.messages--list {
    grid-area: messagesList;
    overflow-y: auto;
    ul {
      list-style: none;
      margin: 0;
      padding: 0;

      li {
        width: 80%;
        border-radius: 14px;
        display: block;
        margin: 5px;
        padding: 10px;

        &.outgoing {
          float: right;
          text-align: right;
          background-color: #4a94f4;
          color: white;
        }

        &.incoming {
          float: left;
          text-align: left;
          background-color: #f0f0f0;
        }
      }
    }
  }

  div.messages--controls {
    grid-area: messagesControls;
    background-color: #f6f6f6;
    border-top: 1px solid #dedede;
    text-align: center;
    padding: 0;
    margin: 0;

    textarea {
      display: inline-block;
      width: 95%;
      border-radius: 14px;
      border-color: #dedede;
      resize: none;
      margin: 5px auto;
      padding: 5px;
      height: 4rem;
      font-size: 14px;

      &:focus {
        outline: none;
      }
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
    'friend',
  ],
  data: () => ({
    toSend: '',
    allMessages: messages.list,
  }),
  computed: {
    messages: function () {
      if (this.friend) {
        return this.allMessages.filter(({ uid }) => this.friend.uid === uid);
      }
      return [];
    },
  },
  watch: {
    friend: function() {
      const vm = this;
      setTimeout(() => {
        const container = vm.$refs.messageList;
        container.scrollTop = container.scrollHeight;
      });
    }
  },
  methods: {
    sendMessage() {
      const vm = this;
      if (this.toSend.length > 0) {
        messages.send(this.friend.uid, this.toSend);
        this.toSend = '';
        this.allMessages = messages.list;
        this.$refs.toSend.focus();
        setTimeout(() => {
          const container = vm.$refs.messageList;
          container.scrollTop = container.scrollHeight;
        });
      }
    },
  },
  created() {
    const vm = this;
    messages.on('incoming', () => {
      vm.allMessages = messages.list;
      setTimeout(() => {
        const container = vm.$refs.messageList;
        container.scrollTop = container.scrollHeight;
      });
    });
    // const container = this.$refs.messageList.$el;
    // container.scrollTop = container.scrollHeight;
  }
}
</script>
