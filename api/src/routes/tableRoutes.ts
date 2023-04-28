import { Router } from 'express'
import TableController from '../controllers/tableController'

class TableRoutes {
  /**
   * UserRoutes
   *
   * @param routes Router
   */
  constructor(routes: Router) {
    routes.get('/doctors', TableController.fetchDoctors)
  }
}

export default TableRoutes
