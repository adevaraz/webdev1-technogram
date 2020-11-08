const {body} = require('express-validator');



const kategoriValidationRules = () => {
    return [
        body('namakategori').trim().not().isEmpty().withMessage('Kategori name field should not be empty')
    ]
}

module.exports = {
    kategoriValidationRules
}