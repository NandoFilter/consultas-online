interface Patient {
  id?: number | undefined
  ref_user: number
  city: string
  has_deficiency: boolean
  ref_deficiency: number
  has_dependency: boolean
  ref_dependency: number
}

export default Patient
