const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const PembacaKategori = sequelize.define("pembaca_kategori", {
    jumlah : {
        type : Sequelize.INTEGER,
        defaultValue : 0
    }
});

module.exports = PembacaKategori;
