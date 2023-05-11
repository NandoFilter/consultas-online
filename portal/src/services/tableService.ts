import { Doctor, Patient } from '@/models'
import service from './service'

export default {
  async getAllDoctors(): Promise<any[]> {
    return service.get('/table/doctors')
  },

  async getAllPatients(): Promise<any[]> {
    return service.get('/table/patients')
  },
}
