import database from '../helper/database'
import { Doctor } from '../models'

const table = 'doctors'

class DoctorSchema {
  public async getAll(): Promise<Doctor[]> {
    const conn = await database.getConnection()

    let doctors: Doctor[] = []

    if (conn) {
      ;[doctors] = await conn.execute(`SELECT * FROM ${table}`)

      conn.end()
    }

    return doctors
  }

  public async getById(id: number): Promise<Doctor | undefined> {
    const conn = await database.getConnection()

    let doctor: Doctor | undefined = undefined

    if (conn) {
      let [rows] = await conn.execute(`SELECT * FROM ${table} WHERE id = ${id}`)

      doctor = rows[0]

      conn.end()
    }

    return doctor
  }

  public async add(doctor: Doctor): Promise<Doctor> {
    const conn = await database.getConnection()

    if (conn) {
      const addDoctor = await conn.execute(
        `INSERT INTO ${table} (
          ref_user, 
          acad_education, 
          ref_occupation, 
          ref_hospital
        ) VALUES (?,?,?,?)`,
        [doctor.ref_user, doctor.acad_education, doctor.ref_occupation, doctor.ref_hospital]
      )

      doctor.id = addDoctor[0].insertId

      conn.end()
    }

    return doctor
  }

  public async update(doctor: Doctor): Promise<Doctor | undefined> {
    const conn = await database.getConnection()

    const { id, ref_user, acad_education, ref_occupation, ref_hospital } = doctor

    let newDoctor: Doctor | undefined = undefined

    if (conn) {
      await conn.execute(
        `UPDATE ${table} SET
          ref_user = ${ref_user},
          acad_education = '${acad_education}',
          ref_occupation = ${ref_occupation},
          ref_hospital = ${ref_hospital}
        WHERE id = ${id}`
      )

      if (id) {
        newDoctor = await this.getById(id)
      }

      conn.end()
    }

    return newDoctor
  }

  public async delete(id: number): Promise<void> {
    const conn = await database.getConnection()

    if (conn) {
      await conn.execute(`DELETE FROM ${table} WHERE id = ${id}`)

      conn.end()
    }
  }
}

export default new DoctorSchema()
