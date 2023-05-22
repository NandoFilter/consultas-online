<template>
  <div>
    <v-btn v-if="!connected" @click="joinChat">Conectar Chat</v-btn>
    <v-card class="chat" v-else>
      <!-- <div class="card-body">
        <div class="card-title">
          <h3>Chat Group</h3>
          <hr>
        </div>
        <div class="card-body">
          <div class="messages" v-for="(msg, index) in messages" :key="index">
            <p><span class="font-weight-bold">{{ msg.user }}: </span>{{ msg.message }}</p>
          </div>
        </div>
      </div>
      <div class="card-footer">
        <form @submit.prevent="sendMessage">
          <div class="gorm-group">
            <label for="user">User:</label>
            <input type="text" v-model="user" class="form-control">
          </div>
          <div class="gorm-group pb-3">
            <label for="message">Message:</label>
            <input type="text" v-model="message" class="form-control">
          </div>
          <button type="submit" class="btn btn-success">Send</button>
        </form>
      </div> -->
      <!-- <h2>{{ username }}</h2> -->
      <div v-if="connected">
        <div>
          <h4>My Chat App</h4>
        </div>
        <ul>
          <small v-if="typing">{{ typing }} is typing</small>
          <li v-for="(message, i) in messages" :key="i">
            <span>
              {{ message.message }}
              <small>:{{ message.user }}</small>
            </span>
          </li>
        </ul>

        <div>
          <form class="message" @submit.prevent="sendMessage">
            <div>
              <input class="message_input" type="text" v-model="newMessage" placeholder="Message" />
            </div>
            <v-btn @click="sendMessage" icon="mdi-send" />
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

type Message = {
  user: any,
  type: number,
  message: string
}

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
      
      this.getSocket.emit('chat-message', {
        user: this.username,
        message: this.newMessage
      });
      this.newMessage = ''
    }
  },
  mounted() {
    this.getSocket.on('chat-message', (data: any) => {
      this.messages = [...this.messages, data];
      // you can also do this.messages.push(data)
    });
  }
})
</script>

<style scoped lang="scss">
.chat {
  width: 500px;
  padding: 20px;
}

.message {
  display: flex;
  align-items: center;
  justify-content: space-between;

  &_input {
    padding: 10px;
    border-radius: 50px;
    box-shadow: 0px 1px 3px gray;
    width: 400px;

    outline: none;
  }
}
</style>