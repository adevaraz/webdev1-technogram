const Pembaca = require("../model/pembaca");
const Berita = require("../model/berita");
const Admin = require("../model/admin");
const Kategori = require("../model/kategori");
const PembacaKategori = require('../model/pembacaKategori');
const setAssociations = () => {
    Pembaca.belongsToMany(Berita, {
        through: 'menyukai',
        as: 'like',
        foreignKey: "id_pembaca"
    });

    Berita.belongsToMany(Pembaca, {
        through: 'menyukai',
        as: 'like',
        foreignKey: "id_berita"
    });

    Pembaca.belongsToMany(Berita, {
        through: 'menyimpan',
        as: 'saved',
        foreignKey: "id_pembaca"
    });

    Berita.belongsToMany(Pembaca, {
        through: 'menyimpan',
        as: 'saved',
        foreignKey: "id_berita"
    });

    Pembaca.belongsToMany(Berita, {
        through: 'mendapat_notifikasi',
        as: 'notification',
        foreignKey: "id_pembaca"
    });
    
    Berita.belongsToMany(Pembaca, {
        through: 'mendapat_notifikasi',
        as: 'notification',
        foreignKey: "id_berita"
    });

    Admin.hasMany(Berita, {
        foreignKey: 'id_admin_pembuat',
        as : 'membuat',
    });

    Admin.hasMany(Berita, {
        foreignKey: 'id_admin_publikasi',
        as : 'mempublikasi'
    });
    
    Pembaca.belongsToMany(Kategori , {
        through : 'pembaca_kategori',
        as : 'count',
        foreignKey : 'id_pembaca'
    });

    Kategori.belongsToMany(Pembaca , {
        through : 'pembaca_kategori',
        as : 'count',
        foreignKey : 'id_kategori' 
    });
};

module.exports = setAssociations;
