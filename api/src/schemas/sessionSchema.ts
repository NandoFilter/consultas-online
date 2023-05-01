import bcrypt from 'bcrypt'
import database from '../helper/database'
import { User, Session } from '../models'
import { generateToken } from '../helper/routes'

const table = 'sessions'

class SessionSchema {
  public async login(email: string, password: string): Promise<Session | undefined> {
    const conn = await database.getConnection()

    let user: User | undefined = undefined

    if (conn) {
      let [rows] = await conn.execute(`SELECT * FROM users WHERE email = '${email}' LIMIT 1`)

      user = rows[0]

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

            return session
          }
        }
      }

      conn.end()
    }

    return undefined
  }

  private async add(session: Session): Promise<void> {
    const conn = await database.getConnection()

    if (conn) {
      await conn.execute(
        `INSERT INTO ${table} (
          ref_user,
          token,
          exp
        ) VALUES (?,?,?)`,
        [session.ref_user, session.token, session.exp]
      )

      conn.end()
    }
  }
}

export default new SessionSchema()
