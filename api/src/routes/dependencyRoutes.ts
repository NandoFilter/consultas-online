import { Router } from 'express'
import DependencyController from '../controllers/dependencyController'

class DependencyRoutes {
  constructor(routes: Router) {
    routes.get('/dependency', DependencyController.fetchAll)
    routes.get('/dependency/:id', DependencyController.fetchById)
  }
}

export default DependencyRoutes
