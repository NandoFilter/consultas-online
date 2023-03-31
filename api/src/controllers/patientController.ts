import { Request, Response } from 'express'
import { Patient } from '../models'
import PatientSchema from '../schemas/patientSchema'

class PatientController {
  /**
   * fetchAll
   *
   * @param req Request
   * @param res Response
   */
  public fetchAll(req: Request, res: Response) {
    PatientSchema.getAll((results: Patient[]) => {
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
      PatientSchema.getById(Number(id), (result: Patient) => {
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
    const {
      ref_user,
      has_deficiency,
      ref_deficiency,
      has_dependency,
      ref_dependency
    } = req.body as Patient

    const patient: Patient = {
      ref_user,
      has_deficiency,
      ref_deficiency,
      has_dependency,
      ref_dependency
    }

    PatientSchema.add(patient)

    return res.json(patient)
  }

  /**
   * update
   *
   * @param req Request
   * @param res Response
   */
  public update(req: Request, res: Response) {
    const id = Number(req.params.id)

    const {
      ref_user,
      has_deficiency,
      ref_deficiency,
      has_dependency,
      ref_dependency
    } = req.body

    const user: Patient = {
      id,
      ref_user,
      has_deficiency,
      ref_deficiency,
      has_dependency,
      ref_dependency
    }

    PatientSchema.update(user, (result: Patient) => {
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

    PatientSchema.delete(id)

    return res.json('Success')
  }
}

export default new PatientController()
