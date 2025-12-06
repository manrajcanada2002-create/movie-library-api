const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendOTPEmail(email, otp) {
  await transport.sendMail({
    from: `Movie Library <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your OTP Code",
    html: `
      <h2>Your OTP Code</h2>
      <p>Your OTP for Movie Library Login is:</p>
      <h1 style="color:#2c62ff;">${otp}</h1>
      <p>This code expires in 10 minutes.</p>
    `,
  });

  console.log("OTP sent to:", email);
}

module.exports = sendOTPEmail;
