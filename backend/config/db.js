const mongoose = require('mongoose')

/**
 * La función `connectDB` se conecta a una base de datos MongoDB utilizando la URI proporcionada y
 * registra un mensaje de éxito si la conexión es exitosa; de lo contrario, registra el error y
 * finaliza el proceso.
 */
const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    }catch(error){
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB