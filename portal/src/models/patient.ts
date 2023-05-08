interface Patient {
  id?: number | undefined
  ref_user: number
  city: string
  ref_deficiency: number | null
  ref_dependency: number | null
}

export default Patient
