import service from './service'
import { Doctor } from '@/models'

export default {
  async getAll(): Promise<Doctor[]> {
    return service.get('/doctor')
  },

  async getById(id: number): Promise<Doctor> {
    return service.get(`/doctor/${id}`)
  },

  async add(doctor: Doctor) {
    return service.post('/doctor', doctor)
  },

  async update(doctor: Doctor): Promise<Doctor> {
    return service.put(`/doctor/${doctor.id}`, doctor)
  },

  async delete(id: number) {
    return service.delete(`/doctor/${id}`)
  },
}
