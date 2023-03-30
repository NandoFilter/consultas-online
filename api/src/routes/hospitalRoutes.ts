import { Router } from 'express'
import HospitalController from '../controllers/hospitalController'

class HospitalRoutes {
  /**
   * HospitalRoutes
   *
   * @param routes Router
   */
  constructor(routes: Router) {
    routes.get('/hospital', HospitalController.fetchAll)
    routes.get('/hospital/:id', HospitalController.fetchById)
    routes.post('/hospital', HospitalController.add)
    routes.put('/hospital:id', HospitalController.update)
    routes.delete('/hospital/:id', HospitalController.delete)
  }
}

export default HospitalRoutes
