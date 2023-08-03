const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  secure: false,
  auth: {
    user: "email@outlook.com",
    pass: "password",
  },
});

const mailOptions = {
  from: "email@outlook.com",
  to: "to-email@gmail.com",
  subject: "Hello from Node.js",
  text: "This is the body of the email",
};

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.error("Error sending email:", error);
  } else {
    console.log("Email sent:", info.response);
  }
});
