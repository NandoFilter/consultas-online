import { useSessionStore } from './session'
import { useFieldStore } from './field'
import { useStatisticStore } from './statistics'

export function initStore() {
  useSessionStore(), useFieldStore().fetchAll(), useStatisticStore().fetchAll()
}

export { useSessionStore, useFieldStore, useStatisticStore }
