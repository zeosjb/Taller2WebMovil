const mongoose = require('mongoose')
const dotenv = require('dotenv')
const bcrypt = require('bcryptjs')
const Client = require('../models/clientModel')
const Admin = require('../models/adminModel')

dotenv.config()

const data = {
    credential: "Ochietto",
    password: "Jaqamain3pals",
}

const salt = bcrypt.genSalt(10)
const hashedPassword = bcrypt.hash(data.password, salt)

const seedAdmin = {
  credential: data.credential,
  password: hashedPassword,
}


const seedClients = [
  {
    names: "Francisca Antonia",
    lastNames: "Soto González",
    dni: "11222333-4",
    email: "francisca.soto@example.com",
    points: 45000,
  },
  {
    names: "Benjamín Ignacio",
    lastNames: "López Araya",
    dni: "44555666-7",
    email: "benjamin.lopez@example.com",
    points: 23000,
  },
  {
    names: "Valentina Andrea",
    lastNames: "Muñoz Herrera",
    dni: "77888999-0",
    email: "valentina.munoz@example.com",
    points: 67000,
  },
  {
    names: "Matías Alejandro",
    lastNames: "Silva Rojas",
    dni: "11222333-4",
    email: "matias.silva@example.com",
    points: 32000,
  },
  {
    names: "Javiera Isidora",
    lastNames: "Torres Carrasco",
    dni: "44555666-7",
    email: "javiera.torres@example.com",
    points: 52000,
  },
  {
    names: "Cristóbal Eduardo",
    lastNames: "González Díaz",
    dni: "77888999-0",
    email: "cristobal.gonzalez@example.com",
    points: 42000,
  },
  {
    names: "Antonia Belén",
    lastNames: "Araya Muñoz",
    dni: "11222333-4",
    email: "antonia.araya@example.com",
    points: 15000,
  },
  {
    names: "Gabriel Alonso",
    lastNames: "Herrera López",
    dni: "44555666-7",
    email: "gabriel.herrera@example.com",
    points: 61000,
  },
  {
    names: "María Ignacia",
    lastNames: "Rojas Silva",
    dni: "77888999-0",
    email: "maria.rojas@example.com",
    points: 35000,
  },
  {
    names: "Maximiliano Felipe",
    lastNames: "Carrasco Torres",
    dni: "11222333-4",
    email: "maximiliano.carrasco@example.com",
    points: 50000,
  },
  {
    names: "Florencia Antonia",
    lastNames: "Díaz González",
    dni: "44555666-7",
    email: "florencia.diaz@example.com",
    points: 29000,
  },
  {
    names: "Sebastián Alejandro",
    lastNames: "Muñoz Araya",
    dni: "77888999-0",
    email: "sebastian.munoz@example.com",
    points: 43000,
  },
  {
    names: "Josefa Catalina",
    lastNames: "López Herrera",
    dni: "11222333-4",
    email: "josefa.lopez@example.com",
    points: 48000,
  },
  {
    names: "Diego Andrés",
    lastNames: "Silva Carrasco",
    dni: "44555666-7",
    email: "diego.silva@example.com",
    points: 67000,
  },
  {
    names: "Isidora Ignacia",
    lastNames: "Torres Díaz",
    dni: "77888999-0",
    email: "isidora.torres@example.com",
    points: 39000,
  },
  {
    names: "Tomás Eduardo",
    lastNames: "González Muñoz",
    dni: "11222333-4",
    email: "tomas.gonzalez@example.com",
    points: 52000,
  },
  {
    names: "Renata Belén",
    lastNames: "Araya López",
    dni: "44555666-7",
    email: "renata.araya@example.com",
    points: 18000,
  },
  {
    names: "Cristián Alonso",
    lastNames: "Herrera Silva",
    dni: "77888999-0",
    email: "cristian.herrera@example.com",
    points: 31000,
  },
  {
    names: "Antonia María",
    lastNames: "Rojas Díaz",
    dni: "11222333-4",
    email: "antonia.rojas@example.com",
    points: 48000,
  },
  {
    names: "Felipe Alejandro",
    lastNames: "Carrasco Muñoz",
    dni: "44555666-7",
    email: "felipe.carrasco@example.com",
    points: 59000,
  },
  {
    names: "Amanda Ignacia",
    lastNames: "Díaz Torres",
    dni: "77888999-0",
    email: "amanda.diaz@example.com",
    points: 24000,
  },
  {
    names: "Matías Eduardo",
    lastNames: "Silva González",
    dni: "11222333-4",
    email: "matias.silva@example.com",
    points: 42000,
  },
  {
    names: "Camila Antonia",
    lastNames: "González Araya",
    dni: "44555666-7",
    email: "camila.gonzalez@example.com",
    points: 36000,
  },
]

// Conexión a la base de datos
mongoose.connect('mongodb+srv://josebenitez:20260521Ab@taller2.utj28ha.mongodb.net/dumbo?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })

const seedDatabase = async () => {
  try {
    await Client.insertMany(seedClients)
  } catch (error) {
    
  }

  try {
    await Admin.create(seedAdmin)
    console.log('Datos de semilla insertados con éxito')
  } catch (error) {
    console.error('Error al insertar datos de semilla:', error.message)
  } finally {
    mongoose.connection.close()
    console.log('Conexión a la base de datos cerrada')
  }
};

seedDatabase();
