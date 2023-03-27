import { Router } from 'express'
import DeficiencyController from '../controllers/deficiencyController'

class DeficiencyRoutes {
  /**
   * UserRoutes
   *
   * @param routes Router
   */
  constructor(routes: Router) {
    routes.get('/deficiency', DeficiencyController.fetchAll)
    routes.get('/deficiency/:id', DeficiencyController.fetchById)
  }
}

export default DeficiencyRoutes
