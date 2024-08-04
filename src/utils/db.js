import mongoose from 'mongoose'

console.log('db url:', process.env.DB_URL)

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to db')
})

mongoose.connection.on('error', (err) => {
  console.log('Mongoose connection error: ', err)
})

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected')
})

export default mongoose
