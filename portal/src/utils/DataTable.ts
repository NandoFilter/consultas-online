import { Doctor, Hospital, Occupation, User } from '@/models'
import { UserService, HospitalService, OccupationService } from '@/services'

type DoctorTable = {
  id: number
  name?: string
  email?: string
  password?: string
  hospital?: string
  occupation?: string
  academy?: string
}

class DataTableUtils {
  public async createDataTable(doctor: Doctor) {
    const users = await UserService.getAll()
    const hospitals = await HospitalService.getAll()
    const occupations = await OccupationService.getAll()

    const user = users.find((user: User) => {
      if (doctor.ref_user == user.id) {
        return user
      }
    }) as User

    const hospital = hospitals.find((hospital: Hospital) => {
      if (doctor.ref_hospital == hospital.id) {
        return hospital
      }
    }) as Hospital

    const occupation = occupations.find((occupation: Occupation) => {
      if (doctor.ref_occupation == occupation.id) {
        return occupation
      }
    }) as Occupation

    const item: DoctorTable = {
      id: doctor.id as number,
      name: user.name,
      email: user.email,
      occupation: occupation.name,
      hospital: hospital.name,
      academy: doctor.acad_education,
      password: user.password,
    }

    return item
  }
}

export default new DataTableUtils()
