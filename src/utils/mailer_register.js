const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'youremail@gmail.com',
//     pass: 'yourpassword',
//   },
// });

// const mailOptions = {
//   from: 'youremail@gmail.com',
//   to: 'myfriend@yahoo.com',
//   subject: 'Sending Email using Node.js',
//   text: 'That was easy!'
// };

// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });

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
