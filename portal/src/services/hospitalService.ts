import service from './service'
import { Hospital } from '@/models'

export default {
  async getAll(): Promise<Hospital[]> {
    return service.get('/hospital')
  },

  async getById(id: number): Promise<Hospital> {
    return service.get(`/hospital/${id}`)
  },

  async add(hospital: Hospital) {
    return service.post('/hospital', hospital)
  },

  async update(hospital: Hospital): Promise<Hospital> {
    return service.put(`/hospital/${hospital.id}`, hospital)
  },

  async delete(id: number): Promise<void> {
    return service.delete(`/hospital/${id}`)
  },
}
