import Deficiency from './deficiency'
import Dependency from './dependency'
import User from './user'

interface Patient {
  id: number
  user: User
  hasDeficiency: boolean
  deficiency: Deficiency
  hasDependency: boolean
  dependency: Dependency
}

export default Patient
