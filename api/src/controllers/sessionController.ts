import { Request, Response } from 'express'
import SessionSchema from '../schemas/sessionSchema'
import { Session } from '../models'

class SessionController {
  public login(req: Request, res: Response) {
    const { email, password } = req.body

    if (email && password) {
      SessionSchema.login(email, password, (result: Session) => {
        if (result) {
          res.json(result)
        }
      })
    }
  }
}

export default new SessionController()
