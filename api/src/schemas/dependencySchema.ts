import database from '../helper/database'
import { Dependency } from '../models'

const table = 'dependencies'

class DependencySchema {
  public async getAll(): Promise<Dependency[]> {
    const conn = await database.getConnection()

    let dependencies: Dependency[] = []

    if (conn) {
      ;[dependencies] = await conn.execute(`SELECT * FROM ${table}`)

      conn.end()
    }

    return dependencies
  }

  public async getById(id: number): Promise<Dependency | undefined> {
    const conn = await database.getConnection()

    let dependency: Dependency | undefined = undefined

    if (conn) {
      let [rows] = await conn.execute(`SELECT * FROM ${table} WHERE id = ${id}`)

      dependency = rows[0]

      conn.end()
    }

    return dependency
  }
}

export default new DependencySchema()
