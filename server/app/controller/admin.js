const Admin = require('../model/admin');

/**
* @author 17 MU
*
* Membuat berita
*/
exports.create = async (req, res, next) => {
    try{
        const admin = {
            username: req.body.username,
            password: req.body.password
        };
        // save to database
        await Admin.create(berita)
        res.status(201).json({
            message : 'Success add new admin!',
            data : admin
        });

    }catch(err){
        next(err)
    } 
}

/**
* @author 17 MU
*
* Mengambil semua admin
*/

exports.getAllAdmin = async(req, res) => {
    try {
        const admin = await Admin.findAll()
        if(admin.length > 0) {
            res.status(200).json({
                message : 'Success retrieve all data',
                data : admin
            })
        } else {
            res.status(200).send({
                message: 'No Admin Found'
            })
        }
    }catch (err) {
        next(err)
    }
}

/**
* @author 17 MU
*
* Delete Admin dengan diketahui id nya
*/
exports.deleteAdminById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await Admin.destroy({
            where: { id_admin: id },
        });
        //jika result === 1 maka record berhasil di delete
        if (result === 1) {
            res.status(200).json({
                message: `Post with id=${id} was deleted successfully.`,
                data: result
            });
        } else {
            const error = new Error("Could not find specific post");
            error.statusCode = 404;
            error.cause = "Invalid Post ID";
            throw error;
        }
    } catch (err) {
        next(err);
    }
};

/**
* @author 17 MU
*
* Delete Semua Record Admin, include restart sequence id_admin
*/
exports.deleteAllAdmin = async (req, res, next) => {
    try {
        const result = await Admin.destroy({
            truncate: true,
            restartIdentity: true,
        });
        res.status(200).json({
            message: `All Admin records was deleted successfully.`,
            data: result
        });
    } catch (err) {
        next(err);
    }
};

/**
* @author 17 MU
*
* Update Admin dengan diketahui id nya
*/
exports.updateAdminById = async (req, res, next) => {
    const id = req.params.id;
    const result = await Admin.update(req.body, {
        where: { id_admin: id }
    })
    .then(num => {
        if (num == 1) {
            res.status(200).json({
                message: `Admin with id=${id} was updated successfully.`,
                data: result
            });
        } else {
            res.status(200).json({
                message: "Cannot update Admin with id=${id}. Maybe Admin was not found or req.body is empty!",
                data: result
            });
        }
    })
    .catch(err => {
        next(err);
    })
};