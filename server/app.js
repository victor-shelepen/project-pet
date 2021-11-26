import { getDb, disconnectDb} from './db/index'

export async function allocateApplication() {
  await getDb()
}

export async function disposeApplication() {
  await disconnectDb()
}