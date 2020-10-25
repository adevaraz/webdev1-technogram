const Sequelize = require("sequelize");
const sequelize = require("../util/database");
const Admin = require("./admin");

const Pembaca = sequelize.define("pembaca", {
    id_pembaca: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    username:{
        type: Sequelize.STRING(15),
        allowNull: false
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Pembaca;
