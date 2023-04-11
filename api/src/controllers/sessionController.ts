import { Request, Response } from 'express'
import SessionSchema from '../schemas/sessionSchema'
import { Session } from '../models'

class SessionController {
  public login(req: Request, res: Response) {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(401).end()
    }

    SessionSchema.login(email, password, (result: Session) => {
      if (result) {
        res.json(result)
      } else {
        return res.status(400).end()
      }
    })
  }
}

export default new SessionController()
