const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const sequelize = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const vacationRoutes = require('./routes/vacationRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// Rutas
app.use('/auth', authRoutes);
app.use('/vacation', vacationRoutes);

// Inicializar base de datos
sequelize.sync({ alter: true }).then(() => {
  console.log('Database synced');
  app.listen(4000, () => console.log('Server running on http://localhost:4000'));
});
