import { DoctorTable, PatientTable } from '@/models'
import service from './service'

export default {
  async getAllDoctors(): Promise<DoctorTable[]> {
    return service.get('/table/doctors')
  },

  async getDoctorById(id: number): Promise<DoctorTable> {
    return service.get(`/table/doctors/${id}`)
  },

  async getAllPatients(): Promise<PatientTable[]> {
    return service.get('/table/patients')
  },

  async getPatientById(id: number): Promise<PatientTable> {
    return service.get(`/table/patients/${id}`)
  },
}
