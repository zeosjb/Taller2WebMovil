const mongoose = require('mongoose')

/**
 * Se define el esquema para los clientes:
 * Con los campos de "Nombres", "Apellidos", "RUT o DNI", "Correo" y "Puntos" 
 */
const clientSchema = mongoose.Schema({
    names: {
        type: String,
        required: [true, 'Nombres obligatorios']
    },
    lastNames: {
        type: String,
        required: [true, 'Apellidos obligatorios']
    },
    dni: {
        type: String,
        required: [true, 'RUT o DNI obligatorio'],
        unique: [true, 'Error al ingresar contraseña'],
    },
    email: {
        type: String,
        required: [true, 'Correo electrónico obligatorio'],
        unique: [true, 'Error al ingresar correo'],
    },
    points: {
        type: Number,
        required: [true, 'Puntos obligatorios']
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model('Client', clientSchema)