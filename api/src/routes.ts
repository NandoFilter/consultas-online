import { Router } from 'express'
import DeficiencyRoutes from './routes/deficiencyRoutes'
import DependencyRoutes from './routes/dependencyRoutes'
import OccupationRoutes from './routes/occupationRoutes'
import UserRoutes from './routes/userRoutes'

const routes = Router()

new UserRoutes(routes)
new DependencyRoutes(routes)
new DeficiencyRoutes(routes)
new OccupationRoutes(routes)

export default routes
