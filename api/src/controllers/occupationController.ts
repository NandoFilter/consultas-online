import { Request, Response } from 'express'
import { Occupation } from '../models'
import OccupationSchema from '../schemas/occupationSchema'

class OccupationController {
  /**
   * fetchAll
   *
   * @param req Request
   * @param res Response
   */
  public fetchAll(req: Request, res: Response) {
    OccupationSchema.getAll((results: Occupation[]) => {
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
      OccupationSchema.getById(Number(id), (result: Occupation) => {
        res.json(result)
      })
    }
  }
}

export default new OccupationController()
