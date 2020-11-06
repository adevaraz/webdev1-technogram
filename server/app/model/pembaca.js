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
    },
    last_changed_pwd : {
        type : Sequelize.BIGINT,
    }
});

module.exports = Pembaca;
