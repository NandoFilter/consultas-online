import { Request, Response } from 'express'
import { Doctor } from '../models'
import DoctorSchema from '../schemas/doctorSchema'
import UserSchema from '../schemas/userSchema'

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

  /**
   * add
   *
   * @param req Request
   * @param res Response
   */
  public add(req: Request, res: Response) {
    const { ref_user, acad_education, ref_occupation, ref_hospital } =
      req.body as Doctor

    const doctor: Doctor = {
      ref_user,
      acad_education,
      ref_occupation,
      ref_hospital
    }

    DoctorSchema.add(doctor)

    return res.json(doctor)
  }

  /**
   * update
   *
   * @param req Request
   * @param res Response
   */
  public update(req: Request, res: Response) {
    const id = Number(req.params.id)

    const { ref_user, acad_education, ref_occupation, ref_hospital } =
      req.body as Doctor

    const doctor: Doctor = {
      id,
      ref_user,
      acad_education,
      ref_occupation,
      ref_hospital
    }

    DoctorSchema.update(doctor, (result: Doctor) => {
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

export default new DoctorController()
