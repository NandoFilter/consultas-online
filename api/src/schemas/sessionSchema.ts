import { QueryError } from 'mysql2'
import database from '../helper/database'
import { User, Session } from '../models'
import bcrypt from 'bcrypt'
import { generateToken } from '../helper/routes'

const table = 'sessions'

class SessionSchema {
  public async login(email: string, password: string, callback: Function) {
    const conn = database.getConnection()

    if (conn) {
      conn.query(`SELECT * FROM users WHERE email = '${email}' LIMIT 1`, async (err: Error, result: User[]) => {
        if (err) throw err

        if (result) {
          const user = result[0]

          if (user) {
            if (user.password && (await bcrypt.compare(password, user.password))) {
              const newToken = generateToken(user)

              if (newToken) {
                const session: Session = {
                  ref_user: user.id as number,
                  token: newToken.token,
                  exp: newToken.exp
                }

                this.add(session)

                callback(session)
              }
            } else {
              console.log('Senha inválida')
              callback(null)
            }
          } else {
            console.log('Usuário inexistente')
            callback(null)
          }
        }
      })

      conn.end()
    }
  }

  private add(session: Session) {
    const conn = database.getConnection()

    if (conn) {
      conn.query(`INSERT INTO ${table} SET ?`, session, (err: QueryError | null) => {
        if (err) throw err
      })

      conn.end()
    }
  }
}

export default new SessionSchema()
