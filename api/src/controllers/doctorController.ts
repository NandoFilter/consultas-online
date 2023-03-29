import { Request, Response } from 'express'
import { Doctor, Occupation, User } from '../models'
import DoctorSchema from '../schemas/doctorSchema'
import OccupationSchema from '../schemas/occupationSchema'
import UserSchema from '../schemas/userSchema'
import UserController from './userController'

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

  public add(req: Request, res: Response) {
    // const { userId, acadEducation, occupationId, hospitalId } = req.body

    // let user = null
    // let occupation = null
    // let hospital = null

    // if (userId) {
    //   UserSchema.getById(Number(userId), (result: User) => {
    //     user = result
    //   })
    // }

    // if (occupationId) {
    //   OccupationSchema.getById(Number(occupationId), (result: Occupation) => {
    //     occupation = result
    //   })
    // }

    // if (user && occupation && hospital) {
    //   const doctor = { user, acadEducation, occupation, hospital }

    //   DoctorSchema.add(doctor)

    //   return res.json(doctor)
    // }

    // return res.send(505).end()
  }
}

export default new DoctorController()
