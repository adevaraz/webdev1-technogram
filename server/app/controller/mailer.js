require('dotenv').config()
const nodemailer = require('nodemailer');
const hbs = require("nodemailer-express-handlebars");

let testAccount = async () => {
    return await nodemailer.createTestAccount();
}

const smtpConfig = {
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
}

const transporter = nodemailer.createTransport(smtpConfig);

module.exports = {
    transporter
};