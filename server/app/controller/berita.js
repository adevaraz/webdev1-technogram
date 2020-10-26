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

exports.update = async (req, res) => {
    const id = req.params.id;
    let filePath=null;

    if (req.file) {
        filePath = req.file.path.replace(/\\/gi, "/");
    }
    console.log(id)
    console.log(req.body.artikel)
    const berita = {
        judul: req.body.judul,
        artikel: req.body.artikel,
        url_gambar: filePath,
        kategori_berita: req.body.kategori_berita,
        jurnalis: req.body.jurnalis,
        deskripsi_jurnalis: req.body.deskripsi_jurnalis

    };
    await Berita.update( berita, {
        where: {id_berita : id}

    })
    .then(num => {
        if (num == 1){
            res.send({
                message : "Berita was updated successfully."
            });
        }else{
            res.send({
                message : `Cannot update Tutorial with id=${id}. Maybe Berita was not found or req.body is empty!`
            })
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating Tutorial with id=" + id
    })})



};