const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const sequelize = require('./config/db');
require('dotenv').config();
const PORT = 4000;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Importar modelos
const Salary = require('./models/Salary');
const User = require('./models/User');
const Vacation = require('./models/Vacation');


Vacation.belongsTo(User, { foreignKey: 'UserID', onDelete: 'CASCADE' });
Salary.belongsTo(User, { foreignKey: 'UserID', onDelete: 'CASCADE' });

// Importar Rutas
const authRoutes = require('./routes/authRoutes');
const vacationRoutes = require('./routes/vacationRoutes');

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/vacation', vacationRoutes);

// Sincronizar modelos con la base de datos
sequelize.sync()
    .then(() => console.log('Base de datos sincronizada'))
    .catch((err) => console.error('Error al sincronizar la base de datos:', err));

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// Inicializar el servidor
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
