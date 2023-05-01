import { Request, Response } from 'express'
import { Occupation } from '../models'
import OccupationSchema from '../schemas/occupationSchema'

class OccupationController {
  public async fetchAll(req: Request, res: Response) {
    const occupations: Occupation[] = await OccupationSchema.getAll()

    if (occupations.length === 0) {
      res.sendStatus(204).end()
    }

    res.json(await OccupationSchema.getAll())
  }

  public async fetchById(req: Request, res: Response) {
    const { id } = req.params

    if (id) {
      const occupation: Occupation | undefined = await OccupationSchema.getById(Number(id))

      if (!occupation) {
        res.sendStatus(404).end()
      }

      res.json(occupation)
    }
  }
}

export default new OccupationController()
