const { body, validationResult } = require("express-validator");
const fs = require("fs");
const path = require("path");



const kategoriValidationRules = () => {
    return [
        body('namakategori').trim().not().isEmpty().withMessage('Kategori name field should not be empty'),
        body('url_gambar_kategori')
            .custom(value => {
                console.log("VALUE : " + value);
                if(!value || value === 'null' || value === 'undefined') return true;
                if(value) {
                    let objPath = path.parse(value);
                    let extType = objPath.ext.toLowerCase();
                    let checkDirName = (objPath.dir === "app/public/categories") ? true : false;
                    let checkExtType = (extType === ".webp") ? true : false;
                    return (checkDirName && checkExtType);
                }
            }).withMessage("Invalid image url.")
    ]
}

const kategoriValidate = (req, res, next) => {
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
    kategoriValidationRules,
    kategoriValidate
}