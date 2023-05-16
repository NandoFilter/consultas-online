import { Router } from 'express'
import DeficiencyController from '../controllers/deficiencyController'

class DeficiencyRoutes {
  constructor(routes: Router) {
    routes.get('/deficiency', DeficiencyController.fetchAll)
    routes.get('/deficiency/statistics', DeficiencyController.fetchStatistics)
    routes.get('/deficiency/:id', DeficiencyController.fetchById)
  }
}

export default DeficiencyRoutes
