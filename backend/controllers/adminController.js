const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const Admin = require('../models/adminModel')

/**
 * La función `registerAdmin` es una función controladora asíncrona que maneja el registro de un
 * administrador. Recibe como parámetros los objetos `req` (solicitud) y `res` (respuesta). 
 */
const registerAdmin = asyncHandler(async (req, res) => {
    const { credential, password } = req.body
    if(!credential || !password) {
        res.status(400)
        throw new Error('Complete los campos.')
    }

    const adminExists = await Admin.findOne({credential})

    if(adminExists){
        res.status(400)
        throw new Error('')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const admin = await Admin.create({
        credential,
        password: hashedPassword
    })

    if(admin){
        res.status(201).json({
            _id: admin.id,
            credentials: admin.credential,
            token: generateToken(admin._id)
        })
    } else {
        res.status(400)
        throw new Error('Datos no válidos')
    }

    res.json({message: 'Admin Registrado'})
})

/**
 * La función `loginAdmin` es una función controladora asíncrona que maneja el inicio de sesión de un
 * administrador. Recibe como parámetros los objetos `req` (solicitud) y `res` (respuesta).
 */
const loginAdmin = asyncHandler(async (req, res) => {
    const { credential, password } = req.body

    const admin = await Admin.findOne({ credential })

    if(admin && (await bcrypt.compare(password, admin.password))){
        res.json({
            _id: admin.id,
            credentials: admin.credential,
            token: generateToken(admin._id)
        })
    }else{
        res.status(400)
        throw new Error('Credenciales no válidas')
    }

    res.json({message: 'Admin inicio sesión'})
})

/**
 * La función `getAdmin` es una función controladora asíncrona que obtiene los detalles del
 * administador que ha iniciado sesión actualmente.
 */
const getAdmin = asyncHandler(async (req, res) => {
    const { _id, credential } = await Admin.findById(req.admin.id)

    res.status(200).json({
        id: _id,
        credential
    })
})

/**
 * La función `generateToken` genera un Token JSON Web (JWT) con un tiempo de expiración de 1 día,
 * utilizando un `id` dado y una clave secreta almacenada en la variable de entorno `JWT_SECRET`.
 * @param id - El parámetro `id` es el identificador único del usuario o entidad para la cual se está
 * generando el token. Se utiliza típicamente para identificar al usuario cuando se decodifica o verifica el token.
 * @returns un Token JSON Web (JWT) generado utilizando el método `jwt.sign`. El token contiene
 * el parámetro `id` como el payload y está firmado usando `process.env.JWT_SECRET` como la clave secreta.
 * El token tiene un tiempo de expiración de 1 día.
 */
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' })
}

module.exports = {
    registerAdmin,
    loginAdmin,
    getAdmin
}