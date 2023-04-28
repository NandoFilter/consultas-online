import { Request, Response } from 'express'
import { Doctor, Hospital, Occupation, User } from '../models'
import DoctorSchema from '../schemas/doctorSchema'
import HospitalSchema from '../schemas/hospitalSchema'
import OccupationSchema from '../schemas/occupationSchema'
import UserSchema from '../schemas/userSchema'

type DoctorTable = {
  id: number
  name?: string
  email?: string
  hospital?: string
  occupation?: string
  academy?: string
}

// TO-DO: Change to Controller
class TableController {
  /**
   * fetchDoctors
   *
   * @returns DoctorTable[]
   */
  fetchDoctors(req: Request, res: Response) {
    // let doctors: Doctor[] = []
    let values: DoctorTable[] = []

    DoctorSchema.getAll((doctors: Doctor[]) => {
      if (doctors.length > 0) {
        doctors.forEach((doctor) => {
          let user: User | undefined
          let hospital: Hospital | undefined
          let occupation: Occupation | undefined

          UserSchema.getById(doctor.ref_user, (result: User) => {
            user = result
          })

          HospitalSchema.getById(doctor.ref_hospital, (result: Hospital) => {
            hospital = result
          })

          OccupationSchema.getById(doctor.ref_occupation, (result: Occupation) => {
            occupation = result
          })

          const doctorTable: DoctorTable = {
            id: doctor.id as number,
            name: user?.name,
            email: user?.email,
            hospital: hospital?.name,
            occupation: occupation?.name,
            academy: doctor.acad_education
          }

          values.push(doctorTable)
        })
      }
    })

    // if (values.length > 0) {
    //   return res.json(values)
    // } else {
    //   return res.sendStatus(400).end()
    // }
  }
}

export default new TableController()
