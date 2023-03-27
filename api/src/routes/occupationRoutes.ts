import { Router } from 'express'
import OccupationController from '../controllers/occupationController'

class OccupationRoutes {
  /**
   * UserRoutes
   *
   * @param routes Router
   */
  constructor(routes: Router) {
    routes.get('/occupation', OccupationController.fetchAll)
    routes.get('/occupation/:id', OccupationController.fetchById)
  }
}

export default OccupationRoutes
