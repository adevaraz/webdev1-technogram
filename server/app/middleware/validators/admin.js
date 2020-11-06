const { body } = require("express-validator");

//aturan validasi untuk admin
const adminValidationRules = () => {
    return [
        body('username')
            .trim()
            .notEmpty().withMessage("Username tidak boleh kosong.")
            .isLength({min: 4}).withMessage("Username harus minimal 4 karakter"),
        body('password')
            .trim()
            .notEmpty().withMessage("Password tidak boleh kosong.")
            .isLength({min: 3}).withMessage("Password harus minimal 3 karakter")
    ];
};

module.exports = {
    adminValidationRules
};