import { Request, Response } from 'express'
import { Hospital } from '../models'
import HospitalSchema from '../schemas/hospitalSchema'

class HospitalController {
  public async fetchAll(req: Request, res: Response): Promise<void> {
    res.json(await HospitalSchema.getAll())
  }

  public async fetchById(req: Request, res: Response) {
    const { id } = req.params

    res.json(await HospitalSchema.getById(Number(id)))
  }

  public async add(req: Request, res: Response): Promise<void> {
    const { name, state, city } = req.body as Hospital

    const hospital: Hospital = { name, state, city }

    res.json(await HospitalSchema.add(hospital))
  }

  public async update(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id)
    const { name, state, city } = req.body

    const hospital: Hospital = { id, name, state, city }

    res.json(await HospitalSchema.update(hospital))
  }

  public async delete(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id)

    await HospitalSchema.delete(id)

    res.status(200).send(`Hospital nº${id} deletado com sucesso`).end()
  }
}

export default new HospitalController()
