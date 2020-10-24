const Berita = require('../model/berita');
const { Op } = require("sequelize");
const sequelize = require("../util/database");

/*
 @author 16 MN

 Mencari Berita terkini/paling baru dengan atau tanpa kata kunci.
*/
exports.recent = async (req , res , next) => {
    try{
        const key = req.query.key || ''
        const currentPage = req.query.page || 1;
        const perPage = req.query.perpage || 10;
        const offset = (currentPage-1) * perPage;
        const result = await Berita.findAll({
            where : {
                [Op.or] : [
                    {judul : sequelize.where(sequelize.fn('LOWER', sequelize.col('judul')),'LIKE' , '%' + key.toLowerCase()  + '%')},
                    {artikel : sequelize.where(sequelize.fn('LOWER', sequelize.col('artikel')),'LIKE' , '%' + key.toLowerCase()  + '%')}
                ],
                [Op.not] : [
                    {waktu_publikasi : null}
                ]
            },
            limit : perPage,
            offset : offset,
            order : [
                ['waktu_publikasi' , 'DESC']
            ]
        });
        res.status(200).json({
            message : 'Success retrieve Posts',
            data : result
        });
    }catch(err){
        next(err)
    }
}

/**
 * @author 31 ZV
 * 
 * Mengambil berita berdasarkan kategori berita
 */
exports.getByCat = async(req, res, next) => {
    try {
        const key = req.query.category;
        const currentPage = req.query.page || 1;
        const perPage = req.query.perpage || 10;
        const offset = (currentPage - 1) * perPage;

        const result = await Berita.findAll({
            where: {
                kategori_berita: sequelize.where(sequelize.fn('LOWER', sequelize.col('kategori_berita')), key.toLowerCase()),
                [Op.not] : [
                    {waktu_publikasi : null}
                ]
            },
            limit : perPage,
            offset : offset,
            order : [
                ['waktu_publikasi' , 'DESC']
            ]
        });

        res.status(200).json({
            message: 'Success retrieve Posts',
            data: result
        });
    } catch(err) {
        next(err);
    }
}