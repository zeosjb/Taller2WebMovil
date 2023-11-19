const asyncHandler = require('express-async-handler')

const Client = require('../models/clientModel')

const getClients = asyncHandler(async (req, res) => {
    const clients = await Client.find()
    res.status(200).json(clients)
})

const setClient = asyncHandler(async (req, res) => {
    const client = await Client.create({
        names: req.body.names,
        lastNames: req.body.lastNames,
        dni: req.body.dni,
        email: req.body.email,
        points: req.body.points
    })

    res.status(200).json(client)
})

const updateClient = asyncHandler(async (req, res) => {
    const client = await Client.findById(req.params.id)

    if(!client){
        res.status(400)
        throw new Error('Cliente no encontrado')
    }

    const updateClient = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true, })

    res.status(200).json(updateClient)
})

const deleteClient = asyncHandler(async (req, res) => {
    const client = await Client.findById(req.params.id)
    
    if(!client){
        res.status(400)
        throw new Error('Cliente no encontrado')
    }

    await client.deleteOne()

    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getClients,
    setClient,
    updateClient,
    deleteClient
}