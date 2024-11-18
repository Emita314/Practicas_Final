const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Vacation = sequelize.define('Vacation', {
  VacationID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  StartDate: { type: DataTypes.DATE, allowNull: false },
  EndDate: { type: DataTypes.DATE, allowNull: false },
  DaysRequested: { type: DataTypes.INTEGER, allowNull: false },
  Salary: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  TotalVacationPay: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  Status: { type: DataTypes.ENUM('Pending', 'Approved', 'Rejected'), defaultValue: 'Pending' },
}, {
    tableName: 'vacations',
    timestamps: false,
});

Vacation.belongsTo(User, { foreignKey: 'UserID', onDelete: 'CASCADE' });

module.exports = Vacation;
