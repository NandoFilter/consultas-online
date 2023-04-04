import { QueryError } from 'mysql2'
import database from '../helper/database'
import { Doctor } from '../models'

const table = 'doctors'

class DoctorSchema {
  /**
   * getAll
   *
   * @param callback Function
   */
  public getAll(callback: Function) {
    const conn = database.getConnection()

    if (conn) {
      conn.query(`SELECT * FROM ${table}`, (err: Error, results: Doctor[]) => {
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
        (err: Error, result: Doctor) => {
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
   * @param doctor Doctor
   */
  public add(doctor: Doctor) {
    const conn = database.getConnection()

    if (conn) {
      conn.query(
        `INSERT INTO ${table} SET ?`,
        doctor,
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
   * @param doctor Doctor
   * @param callback Function
   */
  public update(doctor: Doctor, callback: Function) {
    const conn = database.getConnection()

    const { id, ref_user, acad_education, ref_occupation, ref_hospital } =
      doctor

    if (conn) {
      conn.query(
        `UPDATE ${table} SET ref_user = ${ref_user}, acad_education = '${acad_education}', ref_occupation = ${ref_occupation}, ref_hospital = ${ref_hospital} where id = ${id}`
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

export default new DoctorSchema()
