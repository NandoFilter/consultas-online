import { QueryError } from 'mysql2'
import database from '../database'
import { Patient } from '../models'

const table = 'patients'

class PatientSchema {
  /**
   * getAll
   *
   * @param callback Function
   */
  public getAll(callback: Function) {
    const conn = database.getConnection()

    if (conn) {
      conn.query(`SELECT * FROM ${table}`, (err: Error, results: Patient[]) => {
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
        (err: Error, result: Patient) => {
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
   * @param patient Patient
   */
  public add(patient: Patient) {
    const conn = database.getConnection()

    if (conn) {
      conn.query(
        `INSERT INTO ${table} SET ?`,
        patient,
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
   * @param patient Patient
   * @param callback Function
   */
  public update(patient: Patient, callback: Function) {
    const conn = database.getConnection()

    const {
      id,
      ref_user,
      has_deficiency,
      ref_deficiency,
      has_dependency,
      ref_dependency
    } = patient

    if (conn) {
      conn.query(
        `UPDATE ${table} SET
          ref_user = '${ref_user}',
          has_deficiency = '${has_deficiency}',
          ref_deficiency = '${ref_deficiency}',
          has_dependency = '${has_dependency}',
          ref_dependency = '${ref_dependency}'
        where id = ${id}`
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

export default new PatientSchema()
