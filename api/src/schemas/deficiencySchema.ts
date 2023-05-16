import database from '../helper/database'
import { Deficiency, Statistic } from '../models'

const table = 'deficiencies'

class DeficiencySchema {
  public async getAll(): Promise<Deficiency[]> {
    const conn = await database.getConnection()

    let deficiencies: Deficiency[] = []

    if (conn) {
      ;[deficiencies] = await conn.execute(`SELECT * FROM ${table}`)

      conn.end()
    }

    return deficiencies
  }

  public async getById(id: number): Promise<Deficiency | undefined> {
    const conn = await database.getConnection()

    let deficiency: Deficiency | undefined = undefined

    if (conn) {
      let [rows] = await conn.execute(`SELECT * FROM ${table} WHERE id = ${id}`)

      deficiency = rows[0]

      conn.end()
    }

    return deficiency
  }

  public async getStatistics(): Promise<Statistic[]> {
    const conn = await database.getConnection()

    let deficiencies: Statistic[] = []

    if (conn) {
      ;[deficiencies] = await conn.execute(`
        SELECT d.name, COUNT(p.id) as total
        FROM ${table} d
        LEFT JOIN patients p ON d.id = p.ref_deficiency
        GROUP BY d.name
      `)
    }

    return deficiencies
  }
}

export default new DeficiencySchema()
