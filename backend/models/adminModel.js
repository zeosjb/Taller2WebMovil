const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
    credential: {
        type: String,
        required: [true, 'Credenciales obligatorias'],
        unique: [true, 'Error al ingresar credencial'],
    },
    password: {
        type: String,
        required: [true, 'Contraseña obligatoria'],
        unique: [true, 'Error al ingresar contraseña'],
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('Admin', adminSchema)

