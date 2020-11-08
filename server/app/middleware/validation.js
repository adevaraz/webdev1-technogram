const { validationResult } = require('express-validator');

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    // const extractedErrors = [];
    // errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));
    const error = new Error('Input invalid');
    error.statusCode = 422;
    error.cause = errors.array();
    next(error);
}

module.exports = {
    validate
};
