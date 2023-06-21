import { Request, Response } from 'express'
import { Doctor, DoctorTable } from '../../models'
import { DoctorSchema, HospitalSchema, OccupationSchema, UserSchema } from '../../schemas'

class DoctorTableController {
  public async fetchAll(req: Request, res: Response): Promise<void> {
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
        occupation: occupation?.name,
        hospital: hospital?.name,
        academy: doctor.acad_education
      }

      values.push(doctorTable)
    }

    res.json(values).end()
  }

  public async fetchById(req: Request, res: Response): Promise<void> {
    const { id } = req.params

    let value: DoctorTable | undefined
    let doctor: Doctor | undefined

    if (id) {
      doctor = await DoctorSchema.getById(Number(id))

      if (doctor) {
        const [user, hospital, occupation] = await Promise.all([
          UserSchema.getById(doctor.ref_user),
          HospitalSchema.getById(doctor.ref_hospital),
          OccupationSchema.getById(doctor.ref_occupation)
        ])

        value = {
          id: doctor.id as number,
          name: user?.name,
          email: user?.email,
          occupation: occupation?.name,
          hospital: hospital?.name,
          academy: doctor.acad_education
        }
      }
    }

    res.json(value).end()
  }
}

export default new DoctorTableController()
