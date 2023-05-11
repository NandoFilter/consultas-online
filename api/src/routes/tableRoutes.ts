import { Router } from 'express'
import DoctorTableController from '../controllers/tables/doctorTableController'
import PatientTableController from '../controllers/tables/patientTableController'

class TableRoutes {
  constructor(routes: Router) {
    routes.get('/table/doctors', DoctorTableController.fetchDoctors)
    routes.get('/table/patients', PatientTableController.fetchDoctors)
  }
}

export default TableRoutes
