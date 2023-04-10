import { Router } from 'express'
import UserController from '../controllers/userController'
import { checkToken } from '../helper/routes'

class UserRoutes {
  /**
   * UserRoutes
   *
   * @param routes Router
   */
  constructor(routes: Router) {
    routes.get('/user', UserController.fetchAll)
    routes.get('/user/:id', UserController.fetchById)
    routes.post('/user', UserController.add)
    routes.put('/user/:id', UserController.update)
    routes.delete('/user/:id', UserController.delete)
  }
}

export default UserRoutes
