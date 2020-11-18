const { body, validationResult } = require("express-validator");
const fs = require("fs");
const path = require("path");


const newsValidationRules = () => {
    return [
        body('judul')
            .trim()
            .notEmpty().withMessage("Judul berita tidak boleh kosong.")
            .isLength({min: 3}).withMessage("Judul berita minimal 3 karakter.")
            .isLength({max:100}).withMessage("Judul berita maksimal 100 karakter."),
        body('artikel')
            .trim()
            .notEmpty().withMessage("Artikel tidak boleh kosong."),
        body('kategori_berita')
            .trim()
            .notEmpty().withMessage("Kategori berita tidak boleh kosong.")
            .isLength({min: 3}).withMessage("Kategori minimal 3 karakter.")
            .isLength({max:32}).withMessage("Kategori maksimal 32 karakter."),
        body('jurnalis')
            .trim()
            .notEmpty().withMessage("Nama jurnalis tidak boleh kosong.")
            .isLength({min: 3}).withMessage("Nama jurnalis minimal 3 karakter.")
            .isLength({max:32}).withMessage("Nama jurnalis maksimal 32 karakter."),
        body('deskripsi_jurnalis')
            .trim()
            .notEmpty().withMessage("Deskripsi jurnalis tidak boleh kosong.")
            .isLength({min: 3}).withMessage("Deskripsi jurnalis minimal 3 karakter")
            .isLength({max:255}).withMessage("Deskripsi jurnalis maksimal 255 karakter."),
        body('url_gambar')
            .custom(value => {
                console.log("VALUE : " + value);
                if(!value || value === 'null' || value === 'undefined') return true;
                if(value) {
                    let objPath = path.parse(value);
                    let extType = objPath.ext.toLowerCase();
                    let checkDirName = (objPath.dir === "app/public/images") ? true : false;
                    let checkExtType = (extType === ".jpg" || extType === ".jpeg" || extType === ".png") ? true : false;
                    return (checkDirName && checkExtType);
                }
            }).withMessage("Invalid image url.")
    ];
};

const newsValidate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    if (req.file){
        let filePath = req.file.path.replace(/\\/gi, "/");
        if(filePath!=null) {
            filePath = path.join(__dirname, "..", "..", "..", filePath);
            fs.unlink(filePath, (err) => console.log("error: " + err));
        }
    }
    const error = new Error('Input invalid');
    error.statusCode = 422;
    error.cause = errors.array()
    next(error);
}

module.exports = {
    newsValidationRules,
    newsValidate
};