import { Router } from 'express'
import SessionController from '../controllers/sessionController'

class SessionRoutes {
  constructor(routes: Router) {
    routes.post('/login', SessionController.login)
  }
}

export default SessionRoutes
