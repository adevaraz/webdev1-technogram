require('dotenv').config()
const nodemailer = require('nodemailer');
const hbs = require("nodemailer-express-handlebars");

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

transporter.verify((err, success) => {
    if(err) return new Error(err);
    console.log("Your config is correct");
});

exports.verifyMail = async (email, username, token) => transporter.sendMail({
    from: '"Technogram" <id.technogram@gmail.com>',
    to: email,
    subject: "Email Verifikasi Akun Technogram",
    template: "verify",
    context: {
        user: username,
        verificationToken: token
    }
});

exports.forgetPassorMail = async (email , username , token) => transporter.sendMail({
    from: '"Technogram" <id.technogram@gmail.com>',
    to: email,
    subject: "Reset Password Akun Technogram",
    template: "forgetpassword",
    context: {
        user: username,
        verificationToken: token
    }
});

const handlebarOptions = {
    viewEngine: {
      extName: '.handlebars',
      partialsDir: 'app/controller/mail-views/partials',
      layoutsDir: 'app/controller/mail-views/layouts',
      defaultLayout: ''
    },
    viewPath: 'app/controller/mail-views/templates',
    extName: '.handlebars'
  }
  
  transporter.use('compile', hbs(handlebarOptions));