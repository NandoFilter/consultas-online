import { Router } from 'express'
import PatientController from '../controllers/patientController'

class PatientRoutes {
  constructor(routes: Router) {
    routes.get('/patient', PatientController.fetchAll)
    routes.get('/patient/:id', PatientController.fetchById)
    routes.post('/patient', PatientController.add)
    routes.put('/patient/:id', PatientController.update)
    routes.delete('/patient/:id', PatientController.delete)
  }
}

export default PatientRoutes
