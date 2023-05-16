import { useSessionStore } from './session'
import { useFilterStore } from './filter'
import { useStatisticStore } from './statistics'

export function initStore() {
  useSessionStore(), useFilterStore().fetchAll(), useStatisticStore().fetchAll()
}

export { useSessionStore, useFilterStore, useStatisticStore }
