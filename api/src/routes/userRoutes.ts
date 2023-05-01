import { Router } from 'express'
import UserController from '../controllers/userController'

class UserRoutes {
  constructor(routes: Router) {
    routes.get('/user', UserController.fetchAll)
    routes.get('/user/:id', UserController.fetchById)
    routes.post('/user', UserController.add)
    routes.put('/user/:id', UserController.update)
    routes.delete('/user/:id', UserController.delete)
  }
}

export default UserRoutes
