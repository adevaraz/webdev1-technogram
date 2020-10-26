const Berita = require('../model/berita');
const { Op } = require("sequelize");
const sequelize = require("../util/database");
const fs = require("fs");
const path = require("path");
const fsExtra = require("fs-extra");

/*
 @author 14 KP

 Membuat berita
*/
exports.create = async (req, res, next) => {
    let filePath=null;
    try{
        
        if (req.file) {
            filePath = req.file.path.replace(/\\/gi, "/");
        }

        // Create a news
        const berita = {
            judul: req.body.judul,
            artikel: req.body.artikel,
            url_gambar: filePath,
            kategori_berita: req.body.kategori_berita,
            jumlah_reader: 0,
            jumlah_likes: 0,
            jurnalis: req.body.jurnalis,
            deskripsi_jurnalis: req.body.deskripsi_jurnalis

        };
        // save to database
        await Berita.create(berita)
        res.status(201).json({
            message : 'Success add new news!',
            data : berita
        });

    }catch(err){
        if(filePath!=null){
            deleteImage(filePath)
        }
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
  
/*
 @author 23 NM

 Mengambil semua berita
*/

exports.getAllNews = async(req, res) => {
    try {
        const artikel = await Berita.findAll()
        if(artikel.length > 0) {
            res.status(200).json({
                message : 'Success retrieve all data',
                data : artikel
            })
        } else {
            res.status(200).send({
                message: 'Articles not Found'
            })
        }
    }catch (err) {
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
        const news = await Berita.findByPk(id);
        const result = await Berita.destroy({
            where: { id_berita: id },
        });
        //jika result === 1 maka record berhasil di delete
        if (result === 1) {
            if (news.url_gambar) deleteImage(news.url_gambar); //delete gambar nya
            res.status(200).json({
                message: `Post with id=${id} was deleted successfully.`,
                data: result
            });
        } else {
            const error = new Error("Could not find specific post");
            error.statusCode = 404;
            error.cause = "Invaid Post ID";
            throw error;
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
        deleteAllFiles("app/public/images"); //delete semua gambarnya
        res.status(200).json({
            message: `All post record was deleted successfully.`,
            data: result
        });
    } catch (err) {
        next(err);
    }
};

/*
@author 16 MN
delete gambar
*/
const deleteImage = (filePath) => {
    filePath = path.join(__dirname, "..", "..", filePath);
    fs.unlink(filePath, (err) => console.log(err));
};

/*
@author 28 RA
delete semua file yang berada di dalam direktori tertentu
*/
const deleteAllFiles = (filePath) => {
    filePath = path.join(__dirname, "..", "..", filePath);
    fsExtra.emptyDir(filePath, (err) => console.log(err));
};

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
 @author 17 MU

 Mencari Berita dengan kata kunci dan ditampilkan berdasarkan like
 terbanyak.
*/

exports.mostLiked = async (req, res, next) => {
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
                ['jumlah_likes' , 'DESC']
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

 Mendapatkan berita populer berdasarkan view terbanyak dengan atau tanpa
 kata kunci
*/
exports.popularNews = async (req , res , next) => {
    try{
        const key = req.query.key || '';
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
                ['jumlah_reader' , 'DESC']
            ]
        });
        res.status(200).json({
            message : 'Success retrieve Posts',
            data : result
        });
    }catch(err){
        next(err)
    }
};
