const { defaults } = require("pg");
const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Admin = sequelize.define("admin", {
    id_admin: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    username:{
        type: Sequelize.STRING(15),
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

module.exports = Admin;
