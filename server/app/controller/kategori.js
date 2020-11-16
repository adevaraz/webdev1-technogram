const { where } = require("sequelize/types");
const Kategori = require("../model/kategori");
const Berita = require('../model/berita');
const sequelize = require("../util/database");

//GENERAL CATEGORY
const GENERAL_CATEGORY = 'general'
/*
 @author 16 MN

 Membuat kategori baru dengan nama yang unik
 @header token admin
*/

exports.createKategori = async (req , res , next) => {
    try{
        const namaKategori = req.body.namakategori;
        const searchResult = await Kategori.findOne({
            where : {
                nama_kategori : namaKategori
            }
        })

        if(searchResult){
            const error = new Error('Kategori with such name is exist');
            error.statusCode = 409;
            throw error
        }
        const insertResult = await Kategori.create({
            nama_kategori : namaKategori
        })
        res.status(201).json({
            message : 'Success create new Kategori',
            data : insertResult
        })
    }catch(err){
        next(err)
    }
}

/*
 @author 16 MN

 Menghapus kategori berdasarkan id 
 @header token admin
*/

exports.deleteKategoriByID = async (req,res,next)=> {
    try{
        const id = req.params.id;
        
        const kategori = await Kategori.findByPk(id);

        if(!kategori){
            const error = new Error('Kategori with such id is not exist');
            error.statusCode = 204;
            throw error;
        }
        

        //Find or create general category
        const generalKategori = await Kategori.findOrCreate({
            where : {
                nama_kategori : GENERAL_CATEGORY
            }
        })

        //News with its categorty deleted
        const beritas = await Berita.findAll({
            where : {
                kategori_berita : kategori.nama_kategori
            }
        })

        //if beritas with such category is exist , then update the category to general category
        if(beritas.length > 0){
            for (let i = 0; i < beritas.length; i++)  {
                beritas[i].kategori = generalKategori.nama_kategori
                await beritas[i].save();
            }
        }
        await kategori.destroy();
        res.status(200).json({
            message : 'Success delete kategori'
        })
    }catch(err){
        next(err)
    }
}

/*
 @author 16 MN

Get kategori berdasarkan id
*/
exports.getKategoriByID = async (req,res,next)=> {
    try{
        const id = req.params.id;
        console.log(id);
        const kategori = await Kategori.findByPk(id);
        if(!kategori){
            const error = new Error('Kategori with such id is not exist');
            error.statusCode = 404;
            error.cause = 'Inputed ID is not exist';
            throw error;
        }

        res.status(200).json({
            message : 'Success get kategori',
            data : kategori
        })
    }catch(err){
        next(err)
    }
}

/*
 @author 16 MN

Get kategori berdasarkan id
*/
exports.getAllKategori = async(req,res,next) => {
    try{
        const key = req.query.key || '';
        const currentPage = req.query.page || 1;
        const perPage = req.query.perpage || 10;
        const offset = (currentPage - 1) * perPage;
        
        const result = await Kategori.findAll({
            where: {
                nama_kategori: sequelize.where(sequelize.fn('LOWER', sequelize.col('nama_kategori')),'LIKE' , '%' + key.toLowerCase()  + '%')
            },            
            limit : perPage,
            offset : offset
        });
        res.status(200).json({
            message : 'Success retrieve all kategori',
            data : result
        })
    }catch(err){
        next(err)
    }
}


/*
 @author 16 MN

update kategori berdasarkan nama
 @header token admin
*/
exports.updateKategoriById = async(req,res,next)=> {
    try{
        const id = req.params.id;
        
        const kategori = await Kategori.findByPk(id);

        if(!kategori){
            const error = new Error('Kategori with such id is not exist');
            error.statusCode = 404;
            error.cause = 'Inputed ID is not exist';
            throw error;
        }
         
        const newName = req.body.namakategori;

        const searchResult = await Kategori.findOne({
            where : {
                nama_kategori : newName
            }
        })

        if(searchResult){
            const error = new Error('Kategori with such name is exist');
            error.statusCode = 409;
            throw error
        }

        kategori.nama_kategori = newName;
        await kategori.save()
        res.status(201).json({
            message : 'Success update new Kategori',
            data : kategori
        })
    }catch(err){
        next(err)
    }
}

