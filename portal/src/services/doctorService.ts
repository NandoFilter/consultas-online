import service from './service'
import { Doctor } from '@/models'

export default {
  async getAll(): Promise<Doctor[]> {
    return service.get('/doctor')
  },

  async getById(id: number): Promise<Doctor> {
    const doctor = await service.get(`/doctor/${id}`)

    return doctor[0]
  },

  async add(doctor: Doctor): Promise<Doctor> {
    return service.post('/doctor', doctor)
  },

  async update(doctor: Doctor): Promise<Doctor> {
    const selectedDoctor = await service.put(`/doctor/${doctor.id}`, doctor)

    return selectedDoctor[0]
  },

  async delete(id: number) {
    return service.delete(`/doctor/${id}`)
  },
}
