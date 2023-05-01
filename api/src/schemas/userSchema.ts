import bcrypt from 'bcrypt'
import database from '../helper/database'
import { User } from '../models'

const table = 'users'

class UserSchema {
  public async getAll(): Promise<User[]> {
    const conn = await database.getConnection()

    let users: User[] = []

    if (conn) {
      ;[users] = await conn.execute(`SELECT * FROM ${table}`)

      conn.end()
    }

    return users
  }

  public async getById(id: number): Promise<User | undefined> {
    const conn = await database.getConnection()

    let user: User | undefined = undefined

    if (conn) {
      let [rows] = await conn.execute(`SELECT * FROM ${table} WHERE id = ${id}`)

      user = rows[0]

      conn.end()
    }

    return user
  }

  public async add(user: User): Promise<User> {
    const conn = await database.getConnection()

    if (user.password) {
      await bcrypt
        .hash(user.password, 10)
        .then((hash: string) => {
          user.password = hash
        })
        .catch((err: Error) => {
          throw err
        })
    }

    if (conn) {
      const addUser = await conn.execute(
        `INSERT INTO ${table} (
          name,
          email,
          password
        ) VALUES (?,?,?)`,
        [user.name, user.email, user.password]
      )

      user.id = addUser[0].insertId

      conn.end()
    }

    return user
  }

  public async update(user: User): Promise<User | undefined> {
    const conn = await database.getConnection()

    let { id, name, email, password } = user

    if (password) {
      await bcrypt.hash(password, 10).then((hash: string) => {
        password = hash
      })
    }

    let newUser: User | undefined = undefined

    if (conn && id) {
      await conn.execute(
        `UPDATE ${table} SET
          name = '${name}',
          email = '${email}',
          password = '${password}'
        WHERE id = ${id}`
      )

      if (id) {
        newUser = await this.getById(id)
      }

      conn.end()
    }

    return newUser
  }

  public async delete(id: number): Promise<void> {
    const conn = await database.getConnection()

    if (conn) {
      await conn.execute(`DELETE FROM ${table} WHERE id = ${id}`)

      conn.end()
    }
  }
}

export default new UserSchema()
