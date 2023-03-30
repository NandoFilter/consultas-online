import { QueryError } from 'mysql2'
import database from '../database'
import { Hospital } from '../models'

const table = 'hospitals'

class HospitalSchema {
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
        (err: Error, results: Hospital[]) => {
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

    // Tratamento de erro: 505 (Sem conexão), 404 (Sem ID)

    if (conn) {
      conn.query(
        `SELECT * FROM ${table} WHERE id = ${id}`,
        (err: Error, result: Hospital) => {
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
   * @param hospital Hospital
   */
  public add(hospital: Hospital) {
    const conn = database.getConnection()

    if (conn) {
      conn.query(
        `INSERT INTO ${table} SET ?`,
        hospital,
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
   * @param hospital Hospital
   * @param callback Function
   */
  public update(hospital: Hospital, callback: Function) {
    const conn = database.getConnection()

    const { id, name, state, city } = hospital

    if (conn) {
      conn.query(
        `UPDATE ${table} SET name = '${name}', state = '${state}', city = '${city}' where id = ${id}`
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

export default new HospitalSchema()
