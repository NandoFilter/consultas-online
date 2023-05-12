import { Request, Response } from 'express'
import { User } from '../models'
import { UserSchema } from '../schemas'

class UserController {
  public async fetchAll(req: Request, res: Response): Promise<void> {
    res.json(await UserSchema.getAll())
  }

  public async fetchById(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id)

    if (id) {
      const user: User | undefined = await UserSchema.getById(id)

      if (!user) {
        res.sendStatus(404).end()
      }

      res.json(user)
    }
  }

  public async add(req: Request, res: Response): Promise<void> {
    const { name, email, password } = req.body as User

    const user: User = {
      name,
      email,
      password
    }

    res.json(await UserSchema.add(user))
  }

  public async update(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id)

    const { name, email, password } = req.body as User

    const user: User = {
      id,
      name,
      email,
      password
    }

    res.json(await UserSchema.update(user))
  }

  public async delete(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id)

    await UserSchema.delete(id)

    res.status(200).send(`Usuário nº${id} deletado com sucesso`).end()
  }
}

export default new UserController()
