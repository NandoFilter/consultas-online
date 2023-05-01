import { Router } from 'express'
import TableController from '../controllers/tableController'

class TableRoutes {
  constructor(routes: Router) {
    routes.get('/table/doctors', TableController.fetchDoctors)
  }
}

export default TableRoutes
