const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Client = require('../models/clientModel');
const Admin = require('../models/adminModel');
const dotenv = require('dotenv');
dotenv.config();

async function seedAdmin() {
  try {
    const adminData = {
      credential: 'Ochietto',
      password: 'Jaqamain3pals',
    };

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminData.password, salt);

    adminData.password = hashedPassword;

    await Admin.create(adminData);

    console.log('Datos de semilla de administrador insertados con éxito');
  } catch (error) {
    console.error('Error al insertar datos de semilla de administrador:', error.message);
  }
}

async function seedClients() {
  try {
    const clientData = [
      {
        names: 'Benjamín Ignacio',
        lastNames: 'López Araya',
        dni: '44555666-7',
        email: 'benjamin.lopez@example.com',
        points: 23000,
      },
      {
        names: 'Valentina Andrea',
        lastNames: 'Muñoz Herrera',
        dni: '77888999-0',
        email: 'valentina.munoz@example.com',
        points: 67000,
      },
      {
        names: 'Matías Alejandro',
        lastNames: 'Silva Rojas',
        dni: '11222333-4',
        email: 'matias.silva@example.com',
        points: 32000,
      },
      {
        names: 'Javiera Isidora',
        lastNames: 'Torres Carrasco',
        dni: '55667788-1',
        email: 'javiera.torres@example.com',
        points: 52000,
      },
      {
        names: 'Cristóbal Eduardo',
        lastNames: 'González Díaz',
        dni: '99001122-3',
        email: 'cristobal.gonzalez@example.com',
        points: 42000,
      },
      {
        names: 'Antonia Belén',
        lastNames: 'Araya Muñoz',
        dni: '11223344-5',
        email: 'antonia.araya@example.com',
        points: 15000,
      },
      {
        names: 'Gabriel Alonso',
        lastNames: 'Herrera López',
        dni: '44556677-8',
        email: 'gabriel.herrera@example.com',
        points: 61000,
      },
      {
        names: 'María Ignacia',
        lastNames: 'Rojas Silva',
        dni: '77889900-1',
        email: 'maria.rojas@example.com',
        points: 35000,
      },
      {
        names: 'Maximiliano Felipe',
        lastNames: 'Carrasco Torres',
        dni: '11223341-5',
        email: 'maximiliano.carrasco@example.com',
        points: 50000,
      },
      {
        names: 'Florencia Antonia',
        lastNames: 'Díaz González',
        dni: '44556677-8',
        email: 'florencia.diaz@example.com',
        points: 29000,
      },
      {
        names: 'Sebastián Alejandro',
        lastNames: 'Muñoz Araya',
        dni: '77889900-1',
        email: 'sebastian.munoz@example.com',
        points: 43000,
      },
      {
        names: 'Josefa Catalina',
        lastNames: 'López Herrera',
        dni: '11223342-5',
        email: 'josefa.lopez@example.com',
        points: 48000,
      },
      {
        names: 'Diego Andrés',
        lastNames: 'Silva Carrasco',
        dni: '44556677-8',
        email: 'diego.silva@example.com',
        points: 67000,
      },
      {
        names: 'Isidora Ignacia',
        lastNames: 'Torres Díaz',
        dni: '77889900-1',
        email: 'isidora.torres@example.com',
        points: 39000,
      },
      {
        names: 'Tomás Eduardo',
        lastNames: 'González Muñoz',
        dni: '11223347-5',
        email: 'tomas.gonzalez@example.com',
        points: 52000,
      },
      {
        names: 'Renata Belén',
        lastNames: 'Araya López',
        dni: '44556677-8',
        email: 'renata.araya@example.com',
        points: 18000,
      },
      {
        names: 'Cristián Alonso',
        lastNames: 'Herrera Silva',
        dni: '77889900-1',
        email: 'cristian.herrera@example.com',
        points: 31000,
      },
      {
        names: 'Antonia María',
        lastNames: 'Rojas Díaz',
        dni: '11223394-5',
        email: 'antonia.rojas@example.com',
        points: 48000,
      },
      {
        names: 'Felipe Alejandro',
        lastNames: 'Carrasco Muñoz',
        dni: '44556677-8',
        email: 'felipe.carrasco@example.com',
        points: 59000,
      },
      {
        names: 'Amanda Ignacia',
        lastNames: 'Díaz Torres',
        dni: '77889900-1',
        email: 'amanda.diaz@example.com',
        points: 24000,
      },
      {
        names: 'Matías Eduardo',
        lastNames: 'Silva González',
        dni: '11293344-5',
        email: 'matias.silva@example.com',
        points: 42000,
      },
      {
        names: 'Camila Antonia',
        lastNames: 'González Araya',
        dni: '44556677-8',
        email: 'camila.gonzalez@example.com',
        points: 36000,
      },
    ];

    await Client.insertMany(clientData);

    console.log('Datos de semilla de clientes insertados con éxito');
  } catch (error) {
    console.error('Error al insertar datos de semilla de clientes:', error.message);
  }
}

console.log(process.env.MONGO_URI)

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    return Promise.all([seedAdmin(), seedClients()]);
  })
  .then(() => {
    console.log('Proceso de seed completado con éxito');
  })
  .catch((error) => {
    console.error('Error en el proceso de seed:', error.message);
  })
  .finally(() => {
    mongoose.connection.close();
    console.log('Conexión a la base de datos cerrada');
  });
