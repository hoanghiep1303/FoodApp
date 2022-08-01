const { check, validationResult } = require('express-validator');

exports.signupValidator = [
    check('email').isEmail().normalizeEmail().withMessage('Invalid email'),
    check('password')
        .isLength({ min: 5 })
        .withMessage('Password must be at least 5 characters long'),
];

exports.signinValidator = [
    check('email').isEmail().normalizeEmail().withMessage('Invalid email'),
    check('password')
        .isLength({ min: 5 })
        .withMessage('Password must be at least 5 characters long'),
];

exports.validatorResult = (req, res, next) => {
    const result = validationResult(req);
    const hasErrors = !result.isEmpty();

    if (hasErrors) {
        const firstError = result.array()[0].msg;
        return res.status(400).json({
            errorMessage: firstError,
        });
    }

    next();
};
