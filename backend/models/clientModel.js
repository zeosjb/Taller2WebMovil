const mongoose = require('mongoose')

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
        required: [true, 'RUT o DNI obligatorio']
    },
    email: {
        type: String,
        required: [true, 'Correo electrónico obligatorio']
    },
    points: {
        type: Number,
        required: [true, 'Puntos obligatorios']
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model('Client', clientSchema)