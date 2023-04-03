import Patient from './patient'

interface Exam {
  id: number
  patient: Patient
  name: string
  date: Date
}

export default Exam
