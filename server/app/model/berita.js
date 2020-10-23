const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Berita = sequelize.define("berita", {
  id_berita: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  judul: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  artikel: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  waktu_publikasi: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  url_gambar: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  kategori_berita: {
    type: Sequelize.STRING(32),
    allowNull: false,
  },
  jumlah_reader: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  jumlah_likes: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  jurnalis: {
    type: Sequelize.STRING(32),
    allowNull: false,
  },
  deskripsi_jurnalis: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Berita;
