const nodemailer = require('nodemailer');

const sendEmail = (email) => {
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  transporter.sendMail(email, function (error, _info) {
    if (error) {
      console.log(error);
    }
  });
};

const createEmail = (emailAddress, emailTemplate) => {
  return {
    from: process.env.EMAIL_SERVICE,
    to: emailAddress,
    subject: emailTemplate.template.title,
    html: emailTemplate.template.body
  };
};
