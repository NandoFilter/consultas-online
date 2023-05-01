import { Request, Response } from 'express'
import { Dependency } from '../models'
import DependencySchema from '../schemas/dependencySchema'

class DependencyController {
  public async fetchAll(req: Request, res: Response) {
    res.json(await DependencySchema.getAll())
  }

  public async fetchById(req: Request, res: Response) {
    const { id } = req.params

    if (id) {
      const dependency: Dependency | undefined = await DependencySchema.getById(Number(id))

      if (!dependency) {
        res.sendStatus(404).end()
      }

      res.json(dependency)
    }
  }
}

export default new DependencyController()
