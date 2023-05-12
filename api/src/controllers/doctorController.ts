import { Request, Response } from 'express'
import { Doctor } from '../models'
import { DoctorSchema } from '../schemas'

class DoctorController {
  public async fetchAll(req: Request, res: Response): Promise<void> {
    res.json(await DoctorSchema.getAll())
  }

  public async fetchById(req: Request, res: Response): Promise<void> {
    const { id } = req.params

    if (id) {
      const doctor: Doctor | undefined = await DoctorSchema.getById(Number(id))

      if (!doctor) {
        res.sendStatus(404).end()
      }

      res.json(doctor)
    }
  }

  public async add(req: Request, res: Response): Promise<void> {
    const { ref_user, acad_education, ref_occupation, ref_hospital } = req.body as Doctor

    const doctor: Doctor = {
      ref_user,
      acad_education,
      ref_occupation,
      ref_hospital
    }

    res.json(await DoctorSchema.add(doctor))
  }

  public async update(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id)

    const { ref_user, acad_education, ref_occupation, ref_hospital } = req.body as Doctor

    const doctor: Doctor = {
      id,
      ref_user,
      acad_education,
      ref_occupation,
      ref_hospital
    }

    res.json(await DoctorSchema.update(doctor))
  }

  public async delete(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id)

    await DoctorSchema.delete(id)

    res.status(200).send(`Doutor nº${id} deletado com sucesso`).end()
  }
}

export default new DoctorController()
