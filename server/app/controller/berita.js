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

/*
 @author 28 RA

 Delete Berita dengan diketahui id nya
*/
exports.delete = async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await Berita.destroy({
            where: { id_berita: id },
        });
        if (result === 1) {
            res.status(200).json({
                message: `Post with id=${id} was deleted successfully.`,
                data: result
            });
        } else {
            res.status(404).json({
                message: `Cannot found post record with id=${id}. Post was not found.`,
                data: result
            });
        }
    } catch (err) {
        next(err);
    }
};

/*
 @author 28 RA

 Delete Semua Record Berita, include restart sequence id_berita
*/
exports.deleteAll = async (req, res, next) => {
    try {
        const result = await Berita.destroy({
            truncate: true,
            restartIdentity: true,
        });
        res.status(200).json({
            message: `All post record was deleted successfully.`,
            data: result
        });
    } catch (err) {
        next(err);
    }
};
