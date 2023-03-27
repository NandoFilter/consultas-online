import { Request, Response } from 'express'
import { User } from '../models'
import UserSchema from '../schemas/userSchema'

class UserController {
  /**
   * fetchAll
   *
   * @param req Request
   * @param res Response
   */
  public fetchAll(req: Request, res: Response) {
    UserSchema.getAll((results: User[]) => {
      res.json(results)
    })
  }

  /**
   * fetchById
   *
   * @param req Request
   * @param res Response
   */
  public fetchById(req: Request, res: Response) {
    const { id } = req.body as User

    if (id) {
      UserSchema.getById(id, (result: User) => {
        res.json(result)
      })
    }
  }

  /**
   * add
   *
   * @param req Request
   * @param res Response
   */
  public add(req: Request, res: Response) {
    const { name, email, password } = req.body as User

    const user: User = { name, email, password }

    UserSchema.add(user)

    return res.json(user)
  }

  /**
   * update
   *
   * @param req Request
   * @param res Response
   */
  public update(req: Request, res: Response) {
    const id = Number(req.params.id)
    const { name, email, password } = req.body

    const user: User = { id, name, email, password }

    UserSchema.update(user, (result: User) => {
      res.json(result)
    })
  }

  /**
   * delete
   *
   * @param req Request
   * @param res Response
   */
  public delete(req: Request, res: Response) {
    const id = Number(req.params.id)

    UserSchema.delete(id)

    return res.json('Success')
  }
}

export default new UserController()
