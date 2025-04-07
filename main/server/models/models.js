const { DataTypes } = require('sequelize');
const sequelize = require('../db.js');

// Ваши настройки для подключения к базе данных

const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    surname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: "USER"
    },
    details: {
        type: DataTypes.STRING,
        allowNull: true  // Это поле может быть пустым
    },
    hobbies: {
        type: DataTypes.STRING,
        allowNull: true  // Это поле также может быть пустым
    }
});

// Экспортируем модель
module.exports = { User };







