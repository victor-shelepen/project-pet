import mongoose from "mongoose"

export const connection = {}
let db

export async function getDb() {
  if (!db) {
    console.log(process.env.MONGO_URL, 'mongo connection url.');
    db = await mongoose.connect(process.env.MONGO_URL, {});
  }

  return db
}

export async function disconnectDb() {
  await db.disconnect()
}
