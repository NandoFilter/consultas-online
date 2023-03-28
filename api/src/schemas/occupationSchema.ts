import database from '../database'
import { Occupation } from '../models'

const table = 'occupations'

class OccupationSchema {
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
        (err: Error, results: Occupation[]) => {
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
        (err: Error, result: Occupation) => {
          if (err) throw err

          callback(result)
        }
      )

      conn.end()
    }
  }
}

export default new OccupationSchema()
