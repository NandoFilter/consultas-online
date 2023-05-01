import service from './service'
import { Occupation } from '@/models'

export default {
  async getAll(): Promise<Occupation[]> {
    return service.get('/occupation')
  },

  async getById(id: number): Promise<Occupation> {
    return service.get(`/occupation/${id}`)
  },

  async add(occupation: Occupation) {
    return service.post('/occupation', occupation)
  },

  async update(occupation: Occupation): Promise<Occupation> {
    return service.put(`/occupation/${occupation.id}`, occupation)
  },

  async delete(id: number): Promise<void> {
    return service.delete(`/occupation/${id}`)
  },
}
