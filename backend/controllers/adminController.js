const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const Admin = require('../models/adminModel')

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

const getAdmin = asyncHandler(async (req, res) => {
    const { _id, credential } = await Admin.findById(req.admin.id)

    res.status(200).json({
        id: _id,
        credential
    })
})

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' })
}

module.exports = {
    registerAdmin,
    loginAdmin,
    getAdmin
}