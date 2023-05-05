import service from './service'
import { Deficiency } from '@/models'

export default {
  async getAll(): Promise<Deficiency[]> {
    return service.get('/deficiency')
  },

  async getById(id: number): Promise<Deficiency> {
    return service.get(`/deficiency/${id}`)
  },

  async add(deficiency: Deficiency) {
    return service.post('/deficiency', deficiency)
  },

  async update(deficiency: Deficiency): Promise<Deficiency> {
    return service.put(`/deficiency/${deficiency.id}`, deficiency)
  },

  async delete(id: number): Promise<void> {
    return service.delete(`/deficiency/${id}`)
  },
}
