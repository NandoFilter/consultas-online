import { Request, Response } from 'express'
import { Patient } from '../models'
import PatientSchema from '../schemas/patientSchema'

class PatientController {
  public async fetchAll(req: Request, res: Response): Promise<void> {
    res.json(await PatientSchema.getAll())
  }

  public async fetchById(req: Request, res: Response): Promise<void> {
    const { id } = req.params

    if (id) {
      const patient: Patient | undefined = await PatientSchema.getById(Number(id))

      if (!patient) {
        res.sendStatus(404).end()
      }

      res.json(patient)
    }
  }

  public async add(req: Request, res: Response): Promise<void> {
    const { ref_user, has_deficiency, ref_deficiency, has_dependency, ref_dependency } =
      req.body as Patient

    const patient: Patient = {
      ref_user,
      has_deficiency,
      ref_deficiency,
      has_dependency,
      ref_dependency
    }

    res.json(await PatientSchema.add(patient))
  }

  public async update(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id)

    const { ref_user, has_deficiency, ref_deficiency, has_dependency, ref_dependency } = req.body

    const patient: Patient = {
      id,
      ref_user,
      has_deficiency,
      ref_deficiency,
      has_dependency,
      ref_dependency
    }

    res.json(await PatientSchema.update(patient))
  }

  public async delete(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id)

    await PatientSchema.delete(id)

    res.status(200).send(`Paciente nº${id} deletado com sucesso`).end()
  }
}

export default new PatientController()
