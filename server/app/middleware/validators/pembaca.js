const { body } = require("express-validator");
const Pembaca = require("../../model/pembaca");

const createPembacaValidationRules = () => {
    return [
        body('username')
            .trim()
            .notEmpty().withMessage("Username tidak boleh kosong.")
            .isLength({min: 4}).withMessage("Username harus minimal 4 karakter")
            .custom(async(value) => {
                let isExist = await Pembaca.findOne({
                    where: {
                        username: value
                    }
                });
                if(isExist) {
                    throw new Error("Username is already exist.");
                } else {
                    return true;
                }
            }),
        body('email')
            .trim()
            .notEmpty().withMessage("Email tidak boleh kosong.")
            .isEmail().withMessage("Email harus berformat email yang valid.")
            .custom(async(value) => {
                let isExist = await Pembaca.findOne({
                    where: {
                        email: value
                    }
                });

                if(isExist) {
                    throw new Error("E-mail is already exist.");
                } else {
                    return true;
                }
            }),
        body('password')
            .trim()
            .notEmpty().withMessage("Password tidak boleh kosong.")
            .isLength({min: 3}).withMessage("Password harus minimal 3 karakter")
    ];
};

const updatePembacaValidationRules = () => {
    return [
        body('username')
            .trim()
            .notEmpty().withMessage("Username tidak boleh kosong.")
            .isLength({min: 4}).withMessage("Username harus minimal 4 karakter")
            .custom(async (value, {req}) => {
                let oldPembaca = await Pembaca.findByPk(req.decodedToken.id);
                if(!oldPembaca) {
                    throw new Error(`id Pembaca was not found.`);
                }
                if(value === oldPembaca.username) {
                    return true;
                } else {
                    let isExist = await Pembaca.findOne({
                        where: {
                            username: value
                        }
                    });
                    if(isExist) {
                        throw new Error("Username is already exist.");
                    } else {
                        return true;
                    }
                }
            }),
        body('email')
            .trim()
            .notEmpty().withMessage("Email tidak boleh kosong.")
            .isEmail().withMessage("Email harus berformat email yang valid.")
            .custom(async (value, {req}) => {
                let oldPembaca = await Pembaca.findByPk(req.decodedToken.id);
                if(!oldPembaca) {
                    throw new Error(`id Pembaca was not found.`);
                }
                if(value === oldPembaca.email) {
                    return true;
                } else {
                    let isExist = await Pembaca.findOne({
                        where: {
                            email: value
                        }
                    });
                    if(isExist) {
                        throw new Error("E-mail is already exist.");
                    } else {
                        return true;
                    }
                }
            }),
        body('password')
            .trim()
            .notEmpty().withMessage("Password tidak boleh kosong.")
            .isLength({min: 3}).withMessage("Password harus minimal 3 karakter")
    ];
};

const pembacaSignInValidationRules = () => {
    return [
        body('email')
            .trim()
            .notEmpty().withMessage("Email tidak boleh kosong.")
            .isEmail().withMessage("Email harus berformat email yang valid."),
        body('password')
            .trim()
            .notEmpty().withMessage("Password tidak boleh kosong.")
    ];
};

module.exports = {
    pembacaSignInValidationRules,
    createPembacaValidationRules,
    updatePembacaValidationRules
};