import Query from './query'

interface MedicalClearance {
  id: number
  query: Query
  title: string
  info: string
  validity: Date
}

export default MedicalClearance
