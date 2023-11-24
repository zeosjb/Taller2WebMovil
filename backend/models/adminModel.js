const mongoose = require('mongoose')

/** 
 * El código define el esquema para Admin, que especifica dos campos:
 * "Credencial" y "Contraseña".
 */ 
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

