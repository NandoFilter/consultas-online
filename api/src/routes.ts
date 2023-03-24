import { Router } from 'express'
import UserRoutes from './routes/userRoutes'

const routes = Router()

new UserRoutes(routes)

export default routes
