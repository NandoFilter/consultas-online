import service from './service'
import { Patient } from '@/models'

export default {
  async getAll(): Promise<Patient[]> {
    return service.get('/patient')
  },

  async getById(id: number): Promise<Patient> {
    return service.get(`/patient/${id}`)
  },

  async add(patient: Patient): Promise<Patient> {
    return service.post('/patient', patient)
  },

  async update(patient: Patient): Promise<Patient> {
    const updatedPatient = await service.put(`/patient/${patient.id}`, patient)

    return updatedPatient[0]
  },

  async delete(id: number): Promise<void> {
    return service.delete(`/patient/${id}`)
  },
}
