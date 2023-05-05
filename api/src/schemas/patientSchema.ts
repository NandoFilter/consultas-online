import database from '../helper/database'
import { Patient } from '../models'

const table = 'patients'

class PatientSchema {
  public async getAll(): Promise<Patient[]> {
    const conn = await database.getConnection()

    let patients: Patient[] = []

    if (conn) {
      ;[patients] = await conn.execute(`SELECT * FROM ${table}`)

      conn.end()
    }

    return patients
  }

  public async getById(id: number): Promise<Patient | undefined> {
    const conn = await database.getConnection()

    let patient: Patient | undefined = undefined

    if (conn) {
      let [rows] = await conn.execute(`SELECT * FROM ${table} WHERE id = ${id}`)

      patient = rows[0]

      conn.end()
    }

    return patient
  }

  public async add(patient: Patient): Promise<Patient> {
    const conn = await database.getConnection()

    if (conn) {
      const addPatient = await conn.execute(
        `INSERT INTO ${table} (
          ref_user,
          city,
          ref_deficiency,
          ref_dependency
        ) VALUES (?,?,?,?)`,
        [patient.ref_user, patient.city, patient.ref_deficiency, patient.ref_dependency]
      )

      patient.id = addPatient[0].insertId

      conn.end()
    }

    return patient
  }

  public async update(patient: Patient): Promise<Patient | undefined> {
    const conn = await database.getConnection()

    const { id, ref_user, city, ref_deficiency, ref_dependency } = patient

    let newPatient: Patient | undefined = undefined

    if (conn) {
      await conn.execute(
        `UPDATE ${table} SET
          ref_user = ${ref_user},
          city = '${city}',
          ref_deficiency = ${ref_deficiency},
          ref_dependency = ${ref_dependency}
        where id = ${id}`
      )

      if (id) {
        newPatient = await this.getById(id)
      }

      conn.end()
    }

    return newPatient
  }

  public async delete(id: number): Promise<void> {
    const conn = await database.getConnection()

    if (conn) {
      await conn.execute(`DELETE FROM ${table} WHERE id = ${id}`)

      conn.end()
    }
  }
}

export default new PatientSchema()
