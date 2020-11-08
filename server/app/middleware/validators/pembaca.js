const { body } = require("express-validator");

const pembacaValidationRules = () => {
    return [
        body('username')
            .trim()
            .notEmpty().withMessage("Username tidak boleh kosong.")
            .isLength({min: 4}).withMessage("Username harus minimal 4 karakter"),
        body('email')
            .trim()
            .notEmpty().withMessage("Email tidak boleh kosong.")
            .isEmail().withMessage("Email harus bentuk email yang valid."),
        body('password')
            .trim()
            .notEmpty().withMessage("Password tidak boleh kosong.")
            .isLength({min: 3}).withMessage("Password harus minimal 3 karakter")
    ];
};

module.exports = {
    pembacaValidationRules
};