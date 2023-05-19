import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import routes from './routes'
import database from './helper/database'

import { createServer, Server } from 'http'
import SocketIO from 'socket.io'

class App {
  public app: express.Application
  public server: Server | undefined
  private io: SocketIO.Server | undefined
  public PORT: number = 3333

  constructor() {
    dotenv.config()
    database.createConnection()
    this.app = express()
    this.routes()
    this.sockets()
    this.listen()
  }

  private sockets(): void {
    this.server = createServer(this.app)
    this.io = new SocketIO.Server(this.server)
  }

  private routes(): void {
    this.app.use(express.json())
    this.app.use(cors({ origin: '*' }))
    this.app.use(routes)
  }

  private listen(): void {
    if (this.io) {
      this.io.on('connection', (socket: any) => {
        console.log('a user connected')

        socket.on('chat message', (msg: string) => {
          console.log('message: ' + msg)
        })

        socket.on('disconnect', () => {
          console.log('user disconnected')
        })
      })
    }
  }
}

export default new App()
