const { body } = require("express-validator");
const Admin = require("../../model/admin");


//aturan validasi untuk admin
const createAdminValidationRules = () => {
    return [
        body('username')
            .trim()
            .notEmpty().withMessage("Username tidak boleh kosong.")
            .isLength({min: 4}).withMessage("Username harus minimal 4 karakter")
            .custom(async(value) => {
                let isExist = await Admin.findOne({
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
        body('password')
            .trim()
            .notEmpty().withMessage("Password tidak boleh kosong.")
            .isLength({min: 3}).withMessage("Password harus minimal 3 karakter")
    ];
};

const updateAdminValidationRules = () => {
    return [
        body('username')
            .trim()
            .notEmpty().withMessage("Username tidak boleh kosong.")
            .isLength({min: 4}).withMessage("Username harus minimal 4 karakter")
            .custom(async (value, {req}) => {
                let oldAdmin = await Admin.findByPk(req.params.id);
                if(!oldAdmin) {
                    throw new Error(`id Admin was not found.`);
                }
                if(value === oldAdmin.username) {
                    return true;
                } else {
                    let isExist = await Admin.findOne({
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
        body('password')
            .trim()
            .notEmpty().withMessage("Password tidak boleh kosong.")
            .isLength({min: 3}).withMessage("Password harus minimal 3 karakter")
    ];
};

const signInAdminValidationRules = () => {
    return [
        body('username')
            .trim()
            .notEmpty().withMessage("Username tidak boleh kosong."),
        body('password')
            .trim()
            .notEmpty().withMessage("Password tidak boleh kosong.")
    ];
};

module.exports = {
    createAdminValidationRules,
    updateAdminValidationRules,
    signInAdminValidationRules
};