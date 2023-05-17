interface Doctor {
  id?: number | undefined
  ref_user: number
  acad_education: string
  ref_occupation: number | null
  ref_hospital: number | null
}

export default Doctor
