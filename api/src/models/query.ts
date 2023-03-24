import Doctor from './doctor'
import Patient from './patient'

interface Query {
  id: number
  patient: Patient
  doctor: Doctor
  avaliation?: number
}

export default Query
