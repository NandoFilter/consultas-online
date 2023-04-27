import { Doctor, Hospital, Occupation, User } from '../models'
import DoctorSchema from './doctorSchema'
import hospitalSchema from './hospitalSchema'
import occupationSchema from './occupationSchema'
import UserSchema from './userSchema'

type DoctorTable = {
  id: number
  name?: string
  email?: string
  hospital?: string
  occupation?: string
  academy?: string
}

// TO-DO: Possibly change to Controller
class TablesSchema {
  getDoctorsForTable(callback: Function) {
    let doctors: Doctor[] = []
    let values: DoctorTable[] = []

    DoctorSchema.getAll((results: Doctor[]) => {
      doctors = results
    })

    doctors.forEach((doctor) => {
      let user: User | undefined
      let hospital: Hospital | undefined
      let occupation: Occupation | undefined

      UserSchema.getById(doctor.ref_user, (result: User) => {
        user = result
      })

      hospitalSchema.getById(doctor.ref_hospital, (result: Hospital) => {
        hospital = result
      })

      occupationSchema.getById(doctor.ref_occupation, (result: Occupation) => {
        occupation = result
      })

      const doctorTable: DoctorTable = {
        id: doctor.id as number,
        name: user?.name,
        email: user?.email,
        hospital: hospital?.name,
        occupation: occupation?.name,
        academy: doctor.acad_education
      }

      values.push(doctorTable)
    })
  }
}

export default new TablesSchema()
