import { Router } from 'express'
import doctorController from '../controllers/doctorController'

class DoctorRoutes {
  constructor(routes: Router) {
    routes.get('/doctor', doctorController.fetchAll)
    routes.get('/doctor/:id', doctorController.fetchById)
    routes.post('/doctor', doctorController.add)
    routes.put('/doctor/:id', doctorController.update)
    routes.delete('/doctor/:id', doctorController.delete)
  }
}

export default DoctorRoutes
