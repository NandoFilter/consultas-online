import { Request, Response } from 'express'
import { Doctor } from '../models'
import DoctorSchema from '../schemas/doctorSchema'

class DoctorController {
  /**
   * fetchAll
   *
   * @param req Request
   * @param res Response
   */
  public fetchAll(req: Request, res: Response) {
    DoctorSchema.getAll((results: Doctor[]) => {
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
      DoctorSchema.getById(Number(id), (result: Doctor) => {
        res.json(result)
      })
    }
  }
}

export default new DoctorController()
