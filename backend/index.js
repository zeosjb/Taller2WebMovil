const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const port = process.env.PORT || 5000
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')

dotenv.config()

connectDB()

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/clients', require('./routes/clientRoute'))
app.use('/api/admin', require('./routes/adminRoute'))

app.use(errorHandler)

app.listen(port,  () => {
    console.log(`Server is Running in port ${port}`)
})

