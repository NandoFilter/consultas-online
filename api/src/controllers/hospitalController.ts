import { Request, Response } from 'express'
import { Hospital } from '../models'
import HospitalSchema from '../schemas/hospitalSchema'

class HospitalController {
  /**
   * fetchAll
   *
   * @param req Request Request
   * @param res Response Response
   */
  public fetchAll(req: Request, res: Response) {
    HospitalSchema.getAll((results: Hospital[]) => {
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

    HospitalSchema.getById(Number(id), (result: Hospital) => {
      res.json(result)
    })
  }

  /**
   * add
   *
   * @param req Request
   * @param res Response
   */
  public add(req: Request, res: Response) {
    const { name, state, city } = req.body as Hospital

    const hospital: Hospital = { name, state, city }

    HospitalSchema.add(hospital)

    return res.json(hospital)
  }

  /**
   * update
   *
   * @param req Request
   * @param res Response
   */
  public update(req: Request, res: Response) {
    const id = Number(req.params.id)
    const { name, state, city } = req.body

    const hospital: Hospital = { id, name, state, city }

    HospitalSchema.update(hospital, (result: Hospital) => {
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

    HospitalSchema.delete(id)

    return res.json('Success')
  }
}

export default new HospitalController()
