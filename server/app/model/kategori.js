const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Kategori = sequelize.define("kategori", {
    id_kategori: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    nama_kategori: {
      type: Sequelize.STRING(32),
      allowNull: false,
    },
    url_gambar_kategori: {
      type: Sequelize.STRING,
      allowNull: true
    }
  });
  
  module.exports = Kategori;