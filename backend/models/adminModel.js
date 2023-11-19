const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
    credential: {
        type: String,
        required: [true, 'Credenciales obligatorias']
    },
    password: {
        type: String,
        required: [true, 'Contraseña obligatoria']
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('Admin', adminSchema)

