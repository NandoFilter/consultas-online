import database from '../helper/database'
import { Occupation } from '../models'

const table = 'occupations'

class OccupationSchema {
  public async getAll(): Promise<Occupation[]> {
    const conn = await database.getConnection()

    let occupations: Occupation[] = []

    if (conn) {
      ;[occupations] = await conn.execute(`SELECT * FROM ${table}`)

      conn.end()
    }

    return occupations
  }

  public async getById(id: number): Promise<Occupation | undefined> {
    const conn = await database.getConnection()

    let occupation: Occupation | undefined = undefined

    if (conn) {
      let [rows] = await conn.execute(`SELECT * FROM ${table} WHERE id = ${id}`)

      occupation = rows[0]

      conn.end()
    }

    return occupation
  }
}

export default new OccupationSchema()
