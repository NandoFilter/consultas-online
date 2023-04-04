import database from '../helper/database'
import { Dependency } from '../models'

const table = 'dependencies'

class DependencySchema {
  /**
   * getAll
   *
   * @param callback Function
   */
  public getAll(callback: Function) {
    const conn = database.getConnection()

    if (conn) {
      conn.query(
        `SELECT * FROM ${table}`,
        (err: Error, results: Dependency[]) => {
          if (err) throw err

          callback(results)
        }
      )

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
        (err: Error, result: Dependency) => {
          if (err) throw err

          callback(result)
        }
      )

      conn.end()
    }
  }
}

export default new DependencySchema()
