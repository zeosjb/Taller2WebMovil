const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const port = process.env.PORT || 5000
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')

dotenv.config()

/**
 * La función `connectDB()` es responsable de establecer una conexión con la base de datos. Está definida 
 * en el archivo `config/db.js` y utiliza un controlador de base de datos para conectarse al servidor de la 
 * base de datos.
 */
connectDB()

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

/**
 * `app.use('/api/clients', require('./routes/clientRoute'))` está montando el middleware `clientRoute`
 * en la ruta `/api/clients`. Esto significa que cualquier solicitud que comience con `/api/clients`
 * será manejada por el middleware `clientRoute`. 
 */
app.use('/api/clients', require('./routes/clientRoute'))

/**
 * `app.use('/api/admin', require('./routes/adminRoute'))` está montando el middleware `adminRoute` en
 * la ruta `/api/admin`. Esto significa que cualquier solicitud que comience con `/api/admin` será manejada
 * por el middleware `adminRoute`.
 */
app.use('/api/admin', require('./routes/adminRoute'))

/**
 *  `app.use(errorHandler)` está registrando la función middleware `errorHandler` en la aplicación Express.
 */
app.use(errorHandler)

app.listen(port,  () => {
    console.log(`Server is Running in port ${port}`)
})

