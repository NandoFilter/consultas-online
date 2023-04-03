import service from './service'
import { User } from '@/models'

export default {
  async getAll(): Promise<User[]> {
    return service.get('/user')
  },

  async getById(id: number): Promise<User> {
    return service.get(`/user/${id}`)
  },

  async add(user: User) {
    return service.post('/user', user)
  },

  async update(user: User): Promise<User> {
    return service.put(`/user/${user.id}`, user)
  },

  async delete(id: number) {
    return service.delete(`/user/${id}`)
  },
}
