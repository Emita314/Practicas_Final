const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  UserID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  Username: { type: DataTypes.STRING, unique: true, allowNull: false },
  Password: { type: DataTypes.STRING, allowNull: false },
  Role: { type: DataTypes.ENUM('Admin', 'Employee'), allowNull: false },
  FirstName: { type: DataTypes.STRING, allowNull: false },
  LastName: { type: DataTypes.STRING, allowNull: false },
  Department: { type: DataTypes.STRING },
  Position: { type: DataTypes.STRING },
  StartDate: { type: DataTypes.DATE, allowNull: false },
  Salary: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
}, {
    tableName: 'users',
    timestamps: false,
});

module.exports = User;
