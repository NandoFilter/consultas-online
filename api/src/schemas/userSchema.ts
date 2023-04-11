import { QueryError, ResultSetHeader } from 'mysql2'
import database from '../helper/database'
import { User } from '../models'
import bcrypt from 'bcrypt'

const table = 'users'

class UserSchema {
  /**
   * getAll
   *
   * @param callback Function
   */
  public getAll(callback: Function) {
    const conn = database.getConnection()

    if (conn) {
      conn.query(`SELECT * FROM ${table}`, (err: Error, results: User[]) => {
        if (err) throw err

        callback(results)
      })

      conn.end()
    }
  }

  /**
   * getById
   *
   * @param id number
   * @param callback Function
   */
  public getById(id: number, callback: Function) {
    const conn = database.getConnection()

    if (conn) {
      conn.query(
        `SELECT * FROM ${table} WHERE id = ${id}`,
        (err: Error, result: User) => {
          if (err) throw err

          callback(result)
        }
      )

      conn.end()
    }
  }

  /**
   * add
   *
   * @param user User
   */
  public async add(user: User, callback: Function) {
    const conn = database.getConnection()

    await bcrypt.hash(user.password, 10).then((hash: string) => {
      user.password = hash
    })

    if (conn) {
      conn.query(
        `INSERT INTO ${table} SET ?`,
        user,
        (err: QueryError | null, result: ResultSetHeader) => {
          if (err) throw err

          user.id = result.insertId

          callback(user)
        }
      )

      conn.end()
    }
  }

  /**
   * update
   *
   * @param user User
   * @param callback Function
   */
  public async update(user: User, callback: Function) {
    const conn = database.getConnection()

    await bcrypt.hash(user.password, 10).then((hash: string) => {
      user.password = hash
    })

    const { id, name, email, password } = user

    if (conn && id) {
      conn.query(
        `UPDATE ${table} SET name = '${name}', email = '${email}', password = '${password}' where id = ${id}`,
        (err: Error) => {
          if (err) throw err
        }
      )

      conn.query(
        `SELECT * FROM ${table} WHERE id = ${id}`,
        (err: Error, result: User) => {
          if (err) throw err

          callback(result)
        }
      )

      conn.end()
    }
  }

  /**
   * delete
   *
   * @param id number
   */
  public delete(id: number) {
    const conn = database.getConnection()

    if (conn) {
      conn.query(`DELETE FROM ${table} WHERE id = ${id}`, (err: Error) => {
        if (err) throw err
      })

      conn.end()
    }
  }
}

export default new UserSchema()
