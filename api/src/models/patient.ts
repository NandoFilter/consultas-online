interface Patient {
  id?: number | undefined
  ref_user: number
  has_deficiency: boolean
  ref_deficiency: number
  has_dependency: boolean
  ref_dependency: number
}

export default Patient
