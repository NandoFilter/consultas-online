<template>
  <div>
    <v-btn v-if="!connected" @click="joinChat">Conectar Chat</v-btn>
    <v-card v-else class="chat">
      <div>
        <ul class="messages">
          <small v-if="typing">{{ username }} está digitando...</small>
          <li v-for="(message, i) in messages" :key="i">
            <span>
              {{ message.message }}
              <small>:{{ message.username }}</small>
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
    sendMessage(e: any) {
      e.preventDefault();

      this.messages.push({
        username: "Me",
        type: 0,
        message: this.newMessage,
      });
      
      this.getSocket.emit('chat-message', {
        username: this.username,
        message: this.newMessage
      });

      this.newMessage = ''
    },
    startTyping() {
      this.typing = true
      this.getSocket.emit("typing", this.username)
    },
    stopTyping() {
      this.typing = false
      this.getSocket.emit("stopTyping")
    }
  },
  mounted() {
    this.getSocket.on('chat-message', (data: any) => {
      // this.messages = [...this.messages, data];
      // you can also do this.messages.push(data)
    });
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
  border-radius: 15px;
  background: white;
  box-shadow: 0px 1px 3px gray;

  list-style: none;

  margin: 20px 0;
}

.input {
  display: flex;
  align-items: center;
  justify-content: space-between;

  &_field {
    padding: 10px;
    border-radius: 50px;
    box-shadow: 0px 1px 3px gray;
    width: 380px;
    margin-right: 20px;

    outline: none;
  }
}
</style>