import database from '../helper/database'
import { Deficiency } from '../models'

const table = 'deficiencies'

class DeficiencySchema {
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
        (err: Error, results: Deficiency[]) => {
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
        (err: Error, result: Deficiency) => {
          if (err) throw err

          callback(result)
        }
      )

      conn.end()
    }
  }
}

export default new DeficiencySchema()
