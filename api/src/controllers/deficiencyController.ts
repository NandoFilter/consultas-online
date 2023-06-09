import { Request, Response } from 'express'
import { Deficiency, Statistic } from '../models'
import { DeficiencySchema } from '../schemas'

class DeficiencyController {
  public async fetchAll(req: Request, res: Response) {
    let deficiencies: Deficiency[] | undefined = await DeficiencySchema.getAll()

    if (deficiencies.length === 0) {
      res.sendStatus(204).end()
    }

    res.json(deficiencies)
  }

  public async fetchById(req: Request, res: Response) {
    const { id } = req.params

    if (id) {
      const deficiency: Deficiency | undefined = await DeficiencySchema.getById(Number(id))

      if (!deficiency) {
        res.sendStatus(404).end()
      }

      res.json(deficiency)
    }
  }

  public async fetchStatistics(req: Request, res: Response) {
    let statistics: Statistic[] | undefined = await DeficiencySchema.getStatistics()

    if (statistics.length === 0) {
      res.sendStatus(204).end()
    }

    res.json(statistics)
  }
}

export default new DeficiencyController()
