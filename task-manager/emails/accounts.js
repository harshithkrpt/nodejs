const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "harshith@gmail.com",
    subject: "Welcome Man",
    text: `${name} Welcome`
  });
};

const sendGoodByeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "harshith@gmail.com",
    subject: "Good Bye",
    text: `${name} See You Soon`
  });
};

module.exports = {
  sendWelcomeEmail,
  sendGoodByeEmail
};
