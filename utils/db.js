import mongoose, { connect, connection } from 'mongoose'

const conn = {
  isConnected: false
}
mongoose.set('strictQuery', true)

export async function dbConnection() {
  if (conn.isConnected) return
  const db = await connect(process.env.MONGO_CONNECT_KEY)
  conn.isConnected = db.connections[0].readyState
}

connection.on('connected', () => {
  console.log('successfully')
})

connection.on('error', (err) => {
  console.log(err)
})
