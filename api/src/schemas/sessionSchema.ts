import { QueryError } from 'mysql2'
import database from '../helper/database'
import { User, Session } from '../models'
import * as jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const table = 'sessions'

class SessionSchema {
  public async login(email: string, password: string, callback: Function) {
    const conn = database.getConnection()

    if (conn) {
      conn.query(
        `SELECT * FROM users WHERE email = '${email}' LIMIT 1`,
        async (err: Error, result: User[]) => {
          if (err) throw err

          if (result.length == 0) {
            // Usuário inexistente
            console.log('Usuário inexistente')
          }

          if (result) {
            const user = result[0]

            if (await bcrypt.compare(password, user.password)) {
              const token = jwt.sign(
                { id: user.id, email: user.email },
                process.env.SECRET_KEY as string
              ) as string

              const session: Session = { ref_user: user.id as number, token }

              this.add(session)

              callback(session)
            } else {
              // Senha inválida
              console.log('Senha inválida')
            }
          }
        }
      )

      conn.end()
    }
  }

  private add(session: Session) {
    const conn = database.getConnection()

    if (conn) {
      conn.query(
        `INSERT INTO ${table} SET ?`,
        session,
        (err: QueryError | null) => {
          if (err) throw err
        }
      )

      conn.end()
    }
  }
}

export default new SessionSchema()
