import { QueryError } from 'mysql2'
import database from '../helper/database'
import { Hospital } from '../models'

const table = 'hospitals'

class HospitalSchema {
  public async getAll(): Promise<Hospital[]> {
    const conn = await database.getConnection()

    let hospitals: Hospital[] = []

    if (conn) {
      ;[hospitals] = await conn.execute(`SELECT * FROM ${table}`)

      conn.end()
    }

    return hospitals
  }

  public async getById(id: number): Promise<Hospital | undefined> {
    const conn = await database.getConnection()

    let hospital: Hospital | undefined = undefined

    if (conn) {
      let [rows] = await conn.execute(`SELECT * FROM ${table} WHERE id = ${id}`)

      hospital = rows[0]

      conn.end()
    }

    return hospital
  }

  public async add(hospital: Hospital): Promise<Hospital> {
    const conn = await database.getConnection()

    if (conn) {
      const addHospital = await conn.execute(
        `INSERT INTO ${table} (
          name,
          state,
          city
        ) VALUES (?,?,?)`,
        [hospital.name, hospital.state, hospital.city]
      )

      hospital.id = addHospital[0].insertId

      conn.end()
    }

    return hospital
  }

  public async update(hospital: Hospital): Promise<Hospital | undefined> {
    const conn = await database.getConnection()

    const { id, name, state, city } = hospital

    let newHospital: Hospital | undefined = undefined

    if (conn) {
      await conn.execute(
        `UPDATE ${table} SET
          name = '${name}',
          state = '${state}',
          city = '${city}'
        WHERE id = ${id}`
      )

      if (id) {
        newHospital = await this.getById(id)
      }

      conn.end()
    }

    return newHospital
  }

  public async delete(id: number): Promise<void> {
    const conn = await database.getConnection()

    if (conn) {
      await conn.execute(`DELETE FROM ${table} WHERE id = ${id}`)

      conn.end()
    }
  }
}

export default new HospitalSchema()
