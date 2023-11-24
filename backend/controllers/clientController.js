const asyncHandler = require('express-async-handler')

const Client = require('../models/clientModel')

/**
 * La función `validateClientData` se utiliza para validar los datos de un cliente y devuelve un array de errores
 * si falla alguna validación.
 * @param data - El parámetro `data` es un objeto que contiene los datos del cliente.
 * @returns La función `validateClientData` devuelve un array de mensajes de error.
 */
const validateClientData = (data) => {
    const errors = [];
  
    if (!data.names) {
      errors.push("Los nombres son obligatorios");
    }
  
    if (!data.lastNames) {
      errors.push("Los apellidos son obligatorios");
    }
  
    if (!data.dni || !/^[0-9]{7,10}-[0-9A-Za-z]$/.test(data.dni)) {
      errors.push("El RUT o DNI no es válido");
    }
  
    if (!data.email || !/\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+/.test(data.email)) {
      errors.push("El correo electrónico no es válido");
    }
  
    if (typeof data.points !== "number" || !Number.isInteger(data.points) || data.points < 0) {
      errors.push("Los puntos deben ser un número positivo");
    }
  
    return errors;
  };

/**
 * La función `getClients` es una función que utiliza el middleware `asyncHandler` para manejar operaciones
 * asíncronas.
 */
const getClients = asyncHandler(async (req, res) => {
    const clients = await Client.find()
    res.status(200).json(clients)
})

/**
 * La función `setClient` es una función asíncrona que maneja la creación de un nuevo cliente. Utiliza el
 * middleware `asyncHandler` para gestionar operaciones asíncronas.
 */
const setClient = asyncHandler(async (req, res) => {
    const validationErrors = validateClientData(req.body);

    if (validationErrors.length > 0) {
        res.status(400).json({ errors: validationErrors });
        return;
    }

    const { dni, email } = req.body;

    const existingDni = await Client.findOne({ dni });
    if (existingDni) {
        res.status(400).json({ error: "El RUT o DNI ya está registrado." });
        return;
    }

    const existingEmail = await Client.findOne({ email });
    if (existingEmail) {
        res.status(400).json({ error: "El correo electrónico ya está registrado." });
        return;
    }

    const client = await Client.create({
        names: req.body.names,
        lastNames: req.body.lastNames,
        dni: req.body.dni,
        email: req.body.email,
        points: req.body.points
    })

    res.status(200).json(client)
})

/**
 * La función `updateClient` es una función asíncrona que maneja la actualización de la información de un
 * cliente. Utiliza el middleware `asyncHandler` para gestionar operaciones asíncronas.
 */
const updateClient = asyncHandler(async (req, res) => {
    const validationErrors = validateClientData(req.body);

    if (validationErrors.length > 0) {
        res.status(400).json({ errors: validationErrors });
        return;
    }

    const { dni, email } = req.body;

    const existingDni = await Client.findOne({ dni, _id: { $ne: req.params.id } });
    if (existingDni) {
        res.status(400).json({ error: "El RUT o DNI ya está registrado." });
        return;
    }

    const existingEmail = await Client.findOne({ email, _id: { $ne: req.params.id } });
    if (existingEmail) {
        res.status(400).json({ error: "El correo electrónico ya está registrado." });
        return;
    }

    const client = await Client.findById(req.params.id)

    if(!client){
        res.status(400)
        throw new Error('Cliente no encontrado')
    }

    const updateClient = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true, })

    res.status(200).json(updateClient)
})

/**
 * La función `deleteClient` es una función asíncrona que maneja la eliminación de un cliente. Utiliza el
 * middleware `asyncHandler` para gestionar operaciones asíncronas.
 */
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