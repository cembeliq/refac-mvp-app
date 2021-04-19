const nodemailer = require('nodemailer');

module.exports = async function sendMailRegister(payload) {
  const configMail = {
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  };

  const transporter = await nodemailer.createTransport(configMail);
  const mail = {
    to: payload.email,
    from: 'node-email@gmail.com',
    subject: '[Node Email] - Success Registration',
    html: `<h4>Silakan klik link berikut untuk verifikasi: <a href="${payload.urlVerify}">${payload.urlVerify}</a></h4>`,
  };
  transporter.sendMail(mail);
};
