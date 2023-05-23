import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import routes from './routes'
import database from './helper/database'
import SocketIO from 'socket.io'
import { Message, User } from './models'

class App {
  public app: express.Application
  private io: SocketIO.Server | undefined
  public PORT: number = 3333

  constructor() {
    dotenv.config()
    database.createConnection()
    this.app = express()
    this.routes()
    this.start()
    this.sockets()
  }

  private start(): void {
    const server = this.app.listen(this.PORT, () => {
      console.log(`Server running on port ${this.PORT}`)
    })

    this.io = require('socket.io')(server, {
      cors: {
        origin: '*'
      }
    })
  }

  private routes(): void {
    this.app.use(express.json())
    this.app.use(cors({ origin: '*' }))
    this.app.use(routes)
  }

  private sockets(): void {
    if (this.io) {
      const io = this.io

      io.on('connection', (socket: SocketIO.Socket) => {
        console.log('[CONNECTED] User ID: ' + socket.id)

        socket.on('disconnect', () => {
          console.log('[DISCONNECTED] User ID: ' + socket.id)
        })

        if (socket.connected) {
          socket.on('chat-message', (msg: Message) => {
            io.emit('update', msg)
          })

          socket.on('typing', (data: any) => {
            io.emit('typing', data)
          })

          socket.on('stopTyping', () => {
            io.emit('stopTyping')
          })

          socket.on('joined', async (user: User) => {
            let messageData = null

            if (user) {
              console.log('[CHAT] User joined: ' + user.name)
              // Get User Messages
              // messageData = await db.fetchUserMessages(user);
            }

            io.emit('joined', messageData)
          })

          socket.on('leave', (data: any) => {
            io.emit('leave', data)
          })
        }
      })
    }
  }
}

export default new App()
