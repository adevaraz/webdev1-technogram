const Pembaca = require("../model/pembaca");
const Berita = require("../model/berita");
const Admin = require("../model/admin");

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

    // Admin.hasMany(Berita, {
    //     constraints: true,
        
    // });

    Berita.belongsTo(Admin, {
        constraints: true,
        foreignKey: {
            name: "id_admin",
            allowNull: true
        }
    });
};

module.exports = setAssociations;
