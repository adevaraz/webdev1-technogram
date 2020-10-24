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
 @author 14 KP

 Membuat berita
*/
exports.create = async (req, res, next) => {
    try{
        // Create a news
        const berita = {
            judul: req.body.judul,
            artikel: req.body.artikel,
            url_gambar: req.body.url_gambar,
            kategori_berita: req.body.kategori_berita,
            jumlah_reader: 0,
            jumlah_likes: 0,
            jurnalis: req.body.jurnalis,
            deskripsi_jurnalis: req.body.deskripsi_jurnalis

        };
        // save to database
        await Berita.create(berita)
        res.status(200).json({
            message : 'Success add new news!',
            data : berita
        });

    }catch(err){
        next(err)
    }
}
