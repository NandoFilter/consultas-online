<template>
  <div>
    <v-btn v-if="!connected" @click="joinChat">Conectar Chat</v-btn>
    <v-card v-else class="chat">
      <div>
        <ul class="messages">
          <small v-if="typing">{{ typing }} está digitando...</small>
          <li v-for="(message, i) in messages" :key="i">
            <span :class="`messages_box_${message.type}`">
              {{ message.message }}
            </span>
          </li>
        </ul>

        <div>
          <form class="input" @submit.prevent="sendMessage">
            <div>
              <input class="input_field" type="text" v-model="newMessage" placeholder="Mensagem" />
            </div>
            <v-btn @click="sendMessage" color="primary" icon="mdi-send" />
          </form>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import { mapState } from 'pinia';
import { useSessionStore, useSocketStore } from '@/stores';
import { User } from '@/models';
import { Message } from '../models';

export default defineComponent({
  computed: {
    ...mapState( useSessionStore, ['getActualUser']),
    ...mapState( useSocketStore, ['getSocket'])
  },
  data: () => ({
    username: '' as string,
    newMessage: '' as string,
    messages: [] as Message[],
    connected: false,
    typing: false,
  }),
  watch: {
    newMessage(newMessage) {
      newMessage ? this.startTyping() : this.stopTyping();
    }
  },
  methods: {
    joinChat() {
      const user: User | undefined = this.getActualUser

      if (user && user.name) {
        this.getSocket.emit('joined', user)

        this.username = user.name
        this.connected = true
      }
    },
    sendMessage(e: Event) {
      e.preventDefault();

      if (this.newMessage != '') {
        this.messages.push({
          message: this.newMessage,
          type: 0,
          username: 'Me',
        });
        
        this.getSocket.emit('chat-message', {
          message: this.newMessage,
          username: this.username
        })
      }

      this.newMessage = ''
    },
    startTyping() {
      this.getSocket.emit("typing", this.username)
    },
    stopTyping() {
      this.getSocket.emit("stopTyping")
    }
  },
  mounted() {
    this.getSocket.on('update', (data: Message) => {
      if (data.username != this.getActualUser?.name) {
        this.messages.push({
          message: data.message,
          type: 1,
          username: data.username,
        });
      }
    })

    this.getSocket.on('typing', (data: any) => {
      this.typing = data
    })

    this.getSocket.on('stopTyping', () => {
      this.typing = false
    })
  }
})
</script>

<style scoped lang="scss">
.chat {
  height: 700px;
  width: 500px;

  display: flex;
  justify-content: center;
}

.messages {
  height: 85%;

  border: 2px solid lightgray;
  border-radius: 15px;

  list-style: none;

  display: flex;
  flex-direction: column;

  margin: 20px 0;
  padding: 15px;

  overflow-y: auto;

  &_box_0 {
    display: flex;
    justify-content: right;
    align-items: end;
    float: right;

    background: $primary-color;
    border-radius: 10px;

    width: auto;

    margin: 5px;
    padding: 5px 15px;

    color: #fff;
  }

  &_box_1 {
    display: flex;
    justify-content: left;
    align-items: end;
    float: left;

    background: gray;
    border-radius: 10px;

    width: auto;

    margin: 5px;
    padding: 5px 15px;

    color: #fff;
  }

  /* Scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-button {
    height: 30px;
  }

  &::-webkit-scrollbar-track {
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: $primary-color;
    border-radius: 10px;

    &:hover {
      background: $secondary-color;
    }
  }
}

.input {
  display: flex;
  align-items: center;
  justify-content: space-between;

  &_field {
    padding: 10px;
    margin-right: 20px;

    border: 2px solid lightgray;
    border-radius: 50px;

    width: 380px;

    outline: none;
  }
}
</style>