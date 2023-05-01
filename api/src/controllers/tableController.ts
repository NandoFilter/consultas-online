import { Request, Response } from 'express'
import { Doctor } from '../models'
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

class TableController {
  public async fetchDoctors(req: Request, res: Response): Promise<void> {
    let values: DoctorTable[] = []
    let doctors: Doctor[] = []

    doctors = await DoctorSchema.getAll()

    for (let i = 0; i < doctors.length; i++) {
      let doctor = doctors[i]

      const [user, hospital, occupation] = await Promise.all([
        UserSchema.getById(doctor.ref_user),
        HospitalSchema.getById(doctor.ref_hospital),
        OccupationSchema.getById(doctor.ref_occupation)
      ])

      const doctorTable: DoctorTable = {
        id: doctor.id as number,
        name: user?.name,
        email: user?.email,
        hospital: hospital?.name,
        occupation: occupation?.name,
        academy: doctor.acad_education
      }

      values.push(doctorTable)
    }

    res.json(values).end()
  }
}

export default new TableController()
