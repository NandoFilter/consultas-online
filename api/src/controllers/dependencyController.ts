import { Request, Response } from 'express'
import { Dependency } from '../models'
import DependencySchema from '../schemas/dependencySchema'

class DependencyController {
  /**
   * fetchAll
   *
   * @param req Request
   * @param res Response
   */
  public fetchAll(req: Request, res: Response) {
    DependencySchema.getAll((results: Dependency[]) => {
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
    const { id } = req.params

    if (id) {
      DependencySchema.getById(Number(id), (result: Dependency) => {
        res.json(result)
      })
    }
  }
}

export default new DependencyController()
