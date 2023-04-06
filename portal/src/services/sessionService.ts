import { User, Session } from '@/models'
import service from './service'

export default {
  async login(user: User): Promise<Session> {
    return service.post('/login', user)
  },
}
