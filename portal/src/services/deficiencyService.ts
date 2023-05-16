import service from './service'
import { Deficiency, Statistic } from '@/models'

export default {
  async getAll(): Promise<Deficiency[]> {
    return service.get('/deficiency')
  },

  async getById(id: number): Promise<Deficiency> {
    return service.get(`/deficiency/${id}`)
  },

  async getStatistics(): Promise<Statistic[]> {
    return service.get('/deficiency/statistics')
  },
}
