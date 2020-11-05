const { body, validationResult } = require('express-validator');

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

const validate = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    // const extractedErrors = [];
    // errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));
    res.status(422).json({
      errors: errors.array(),
    });
}

module.exports = {
    adminValidationRules,
    pembacaValidationRules,
    validate
};
