import { Request, Response } from 'express'
import { Patient } from '../../models'
import UserSchema from '../../schemas/userSchema'
import PatientSchema from '../../schemas/patientSchema'
import DeficiencySchema from '../../schemas/deficiencySchema'
import DependencySchema from '../../schemas/dependencySchema'

type PatientTable = {
  id: number
  name?: string
  email?: string
  city?: string
  deficiency?: string
  dependency?: string
}

class PatientTableController {
  public async fetchDoctors(req: Request, res: Response): Promise<void> {
    let values: PatientTable[] = []
    let patients: Patient[] = []

    patients = await PatientSchema.getAll()

    for (let i = 0; i < patients.length; i++) {
      let patient = patients[i]

      const [user, deficiency, dependency] = await Promise.all([
        UserSchema.getById(patient.ref_user),
        DeficiencySchema.getById(patient.ref_deficiency),
        DependencySchema.getById(patient.ref_dependency)
      ])

      const patientTable: PatientTable = {
        id: patient.id as number,
        name: user?.name,
        email: user?.email,
        city: patient.city,
        deficiency: deficiency?.name,
        dependency: dependency?.name
      }

      values.push(patientTable)
    }

    res.json(values).end()
  }
}

export default new PatientTableController()
