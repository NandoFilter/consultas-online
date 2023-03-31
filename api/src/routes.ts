import { Router } from 'express'
import DeficiencyRoutes from './routes/deficiencyRoutes'
import DependencyRoutes from './routes/dependencyRoutes'
import DoctorRoutes from './routes/doctorRoutes'
import HospitalRoutes from './routes/hospitalRoutes'
import OccupationRoutes from './routes/occupationRoutes'
import PatientRoutes from './routes/patientRoutes'
import UserRoutes from './routes/userRoutes'

const routes = Router()

new UserRoutes(routes)
new DependencyRoutes(routes)
new DeficiencyRoutes(routes)
new OccupationRoutes(routes)
new HospitalRoutes(routes)
new DoctorRoutes(routes)
new PatientRoutes(routes)

export default routes
