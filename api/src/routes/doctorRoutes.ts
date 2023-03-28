import { Router } from 'express'
import doctorController from '../controllers/doctorController'

class DoctorRoutes {
  constructor(routes: Router) {
    routes.get('/doctor', doctorController.fetchAll)
  }
}
