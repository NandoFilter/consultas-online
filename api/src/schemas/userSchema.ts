import { QueryError } from 'mysql2'
import database from '../database'
import { User } from '../models'

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
  public add(user: User) {
    const conn = database.getConnection()

    if (conn) {
      conn.query(
        `INSERT INTO ${table} SET ?`,
        user,
        (err: QueryError | null) => {
          if (err) throw err
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
  public update(user: User, callback: Function) {
    const conn = database.getConnection()

    const { id, name, email, password } = user

    if (conn) {
      conn.query(
        `UPDATE ${table} SET name = '${name}', email = '${email}', password = '${password}' where id = ${id}`
      )

      if (id) {
        this.getById(id, callback)
      }

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
