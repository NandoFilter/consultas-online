import { Router } from 'express'
import DeficiencyRoutes from './routes/deficiencyRoutes'
import DependencyRoutes from './routes/dependencyRoutes'
import HospitalRoutes from './routes/hospitalRoutes'
import OccupationRoutes from './routes/occupationRoutes'
import UserRoutes from './routes/userRoutes'

const routes = Router()

new UserRoutes(routes)
new DependencyRoutes(routes)
new DeficiencyRoutes(routes)
new OccupationRoutes(routes)
new HospitalRoutes(routes)

export default routes
