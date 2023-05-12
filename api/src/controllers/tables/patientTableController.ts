import { Request, Response } from 'express'
import { Patient, PatientTable } from '../../models'
import { DeficiencySchema, DependencySchema, PatientSchema, UserSchema } from '../../schemas'

class PatientTableController {
  public async fetchAll(req: Request, res: Response): Promise<void> {
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

  public async fetchById(req: Request, res: Response): Promise<void> {
    const { id } = req.params

    let value: PatientTable | undefined
    let patient: Patient | undefined

    if (id) {
      patient = await PatientSchema.getById(Number(id))

      if (patient) {
        const [user, deficiency, dependency] = await Promise.all([
          UserSchema.getById(patient.ref_user),
          DeficiencySchema.getById(patient.ref_deficiency),
          DependencySchema.getById(patient.ref_dependency)
        ])

        value = {
          id: patient.id as number,
          name: user?.name,
          email: user?.email,
          city: patient.city,
          deficiency: deficiency?.name,
          dependency: dependency?.name
        }
      }
    }

    res.json(value).end()
  }
}

export default new PatientTableController()
