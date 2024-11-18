const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Salary = sequelize.define('Salary', {
  SalaryID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  Salary: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  EffectiveDate: { type: DataTypes.DATE, allowNull: false },
}, {
    tableName: 'salaries',
    timestamps: false,
});

Salary.belongsTo(User, { foreignKey: 'UserID', onDelete: 'CASCADE' });

module.exports = Salary;
