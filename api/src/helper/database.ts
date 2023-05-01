import Connection from 'mysql2/typings/mysql/lib/Connection'
import mysql from 'mysql2/promise'

class Database {
  conn: Connection | undefined

  constructor() {
    this.createConnection().then((conn) => (this.conn = conn))
  }

  public async createConnection(): Promise<any> {
    const host = process.env.DB_HOST
    const user = process.env.DB_USER
    const pass = process.env.DB_PASS
    const name = process.env.DB_NAME

    if (host && user && name) {
      const conn = await mysql.createConnection({
        host: host,
        user: user,
        password: pass,
        database: name
      })

      return conn
    }
  }

  public async getConnection(): Promise<Connection | undefined> {
    this.conn = await this.createConnection()

    if (this.conn) {
      this.conn.connect()
    }

    return this.conn
  }
}

export default new Database()
