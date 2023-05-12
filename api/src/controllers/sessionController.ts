import { Request, Response } from 'express'
import { SessionSchema } from '../schemas'

class SessionController {
  public async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body

    if (!email || !password) {
      res.sendStatus(401).end()
    }

    const result = await SessionSchema.login(email, password)

    if (!result) {
      res.sendStatus(400).end()
    }

    res.json(result)
  }
}

export default new SessionController()
