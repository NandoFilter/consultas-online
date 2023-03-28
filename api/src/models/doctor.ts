import Hospital from './hospital'
import Occupation from './occupation'
import User from './user'

interface Doctor {
  id?: number | undefined
  user: User
  acadEducation: string
  occupation: Occupation
  hospital: Hospital
}

export default Doctor
