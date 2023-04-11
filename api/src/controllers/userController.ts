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
    const id = Number(req.params.id)

    if (!id) {
      return res.send(500).end()
    }

    UserSchema.getById(id, (result: User) => {
      Object.keys(result).length ? res.json(result) : res.send(404).end()
    })
  }

  /**
   * add
   *
   * @param req Request
   * @param res Response
   */
  public add(req: Request, res: Response) {
    let user: User = req.body as User

    if (!user.name || !user.email) {
      return res.status(400).end()
    }

    UserSchema.add(user, (result: User) => {
      return res.status(201).json(result)
    })
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

    return res.send(200).end()
  }
}

export default new UserController()
