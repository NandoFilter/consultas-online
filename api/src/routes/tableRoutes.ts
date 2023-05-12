import { Router } from 'express'
import DoctorTableController from '../controllers/tables/doctorTableController'
import PatientTableController from '../controllers/tables/patientTableController'

class TableRoutes {
  constructor(routes: Router) {
    routes.get('/table/doctors', DoctorTableController.fetchAll)
    routes.get('/table/doctors/:id', DoctorTableController.fetchById)

    routes.get('/table/patients', PatientTableController.fetchAll)
    routes.get('/table/patients/:id', PatientTableController.fetchById)
  }
}

export default TableRoutes
