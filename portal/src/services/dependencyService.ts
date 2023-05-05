import service from './service'
import { Dependency } from '@/models'

export default {
  async getAll(): Promise<Dependency[]> {
    return service.get('/dependency')
  },

  async getById(id: number): Promise<Dependency> {
    return service.get(`/dependency/${id}`)
  },

  async add(dependency: Dependency) {
    return service.post('/dependency', dependency)
  },

  async update(dependency: Dependency): Promise<Dependency> {
    return service.put(`/dependency/${dependency.id}`, dependency)
  },

  async delete(id: number): Promise<void> {
    return service.delete(`/dependency/${id}`)
  },
}
