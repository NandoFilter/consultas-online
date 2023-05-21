import { useSessionStore } from './session'
import { useFieldStore } from './field'
import { useStatisticStore } from './statistics'
import { useSocketStore } from './socket'

export function initStore() {
  useSessionStore(),
    useFieldStore().fetchAll(),
    useStatisticStore().fetchAll(),
    useSocketStore()
}

export { useSessionStore, useFieldStore, useStatisticStore, useSocketStore }
