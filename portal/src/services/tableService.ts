import { Doctor, Patient } from '@/models'
import service from './service'

export default {
  async getAllDoctors(): Promise<any[]> {
    return service.get('/table/doctors')
  },

  async getDoctorById(id: number): Promise<Doctor> {
    return service.get(`/table/doctors/${id}`)
  },

  async getAllPatients(): Promise<any[]> {
    return service.get('/table/patients')
  },

  async getPatientById(id: number): Promise<Patient> {
    return service.get(`/table/patients/${id}`)
  },
}
