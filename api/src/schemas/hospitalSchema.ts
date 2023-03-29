import { QueryError } from "mysql2";
import database from "../database";
import { Hospital } from "../models";

const table = 'hospitals'

class HospitalSchema {
  public getAll(callback: Function) {
		const conn = database.getConnection()

		if (conn) {
			conn.query(`SELECT * FROM ${table}`, (err: Error, results: Hospital[]) => {
				if (err) throw err

        callback(results)
			})

      conn.end()
		}
	}

  public getById(id: number, callback: Function) {
    const conn = database.getConnection()

    // Tratamento de erro: 505 (Sem conexão), 404 (Sem ID)

    if (conn) {
      conn.query(`SELECT * FROM ${table} WHERE id = ${id}`, (err: Error, result: Hospital) => {
        if (err) throw err
        
        callback(result)
      })

      conn.end()
    }
  }

  public add(hospital: Hospital) {
    const conn = database.getConnection()

    if (conn) {
      conn.query(`INSERT INTO ${table} SET ?`, hospital, (err: QueryError | null) => {
        if (err) throw err
      })

      conn.end()
    }
  }
}