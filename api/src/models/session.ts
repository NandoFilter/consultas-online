interface Session {
  id?: number
  ref_user: number
  token: string
  exp?: Date
}

export default Session
