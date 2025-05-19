const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

async function sendWelcomeEmail(email, fullName) {
    const mailOptions = {
        from: `"AskMe Team" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "תודה על ההרשמה!",
        html: `
      <h2>שלום ${fullName},</h2>
      <p>תודה שנרשמת לאתר שלנו! אנחנו מתרגשים שאת/ה איתנו 🤗</p>
      <p>בברכה,<br>צוות AskMe</p>
    `,
    };

    await transporter.sendMail(mailOptions);
}

module.exports = {
    sendWelcomeEmail,
};