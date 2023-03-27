import { Request, Response } from 'express'
import { Deficiency } from '../models'
import DeficiencySchema from '../schemas/deficiencySchema'

class DeficiencyController {
  /**
   * fetchAll
   *
   * @param req Request
   * @param res Response
   */
  public fetchAll(req: Request, res: Response) {
    DeficiencySchema.getAll((results: Deficiency[]) => {
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
      DeficiencySchema.getById(Number(id), (result: Deficiency) => {
        res.json(result)
      })
    }
  }
}

export default new DeficiencyController()
