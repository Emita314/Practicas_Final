const { Sequelize } = require('sequelize');

// Crear una instancia de Sequelize para conectar con la base de datos
const sequelize = new Sequelize('vacationmanagement', 'root', '24042006', {
  host: 'localhost',  // Si tu servidor está en otro host, cámbialo aquí
  dialect: 'mysql'
});

async function authenticateDB() {
  try {
    // Probar la conexión
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

// Llamar a la función para verificar la conexión
authenticateDB();

module.exports = sequelize;
