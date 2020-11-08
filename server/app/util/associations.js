const Pembaca = require("../model/pembaca");
const Berita = require("../model/berita");
const Admin = require("../model/admin");
const Kategori = require("../model/kategori");

const setAssociations = () => {
    Pembaca.belongsToMany(Berita, {
        through: 'menyukai',
        foreignKey: "id_pembaca"
    });
    Berita.belongsToMany(Pembaca, {
        through: 'menyukai',
        foreignKey: "id_berita"
    });

    Pembaca.belongsToMany(Berita, {
        through: 'menyimpan',
        as: 'saved',
        foreignKey: "id_pembaca"
    });
    Berita.belongsToMany(Pembaca, {
        through: 'menyimpan',
        foreignKey: "id_berita"
    });

    Pembaca.belongsToMany(Berita, {
        through: 'mendapat_notifikasi',
        foreignKey: "id_pembaca"
    });
    Berita.belongsToMany(Pembaca, {
        through: 'mendapat_notifikasi',
        foreignKey: "id_berita"
    });

    Admin.hasMany(Berita, {
        foreignKey: 'id_admin_pembuat',
        as : 'membuat',
    });

    Admin.hasMany(Berita, {
        foreignKey: 'id_admin_publikasi',
        as : 'mempublikasi',
    });
};

module.exports = setAssociations;
