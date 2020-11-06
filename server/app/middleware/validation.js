const {validationResult} = require('express-validator');

exports.validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const error = new Error('Input invalid');
    error.statusCode = 422;
    error.cause = errors.array()
    next(error);
}

