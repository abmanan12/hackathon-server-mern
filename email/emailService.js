const nodemailer = require('nodemailer');

// Create a Nodemailer transporter using SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'abdulmanankam@gmail.com',
        pass: process.env.GMAIL_PASS,
    },
});


// Function to send password reset email
const sendPasswordResetEmail = (recipientEmail, otpCode) => {

    const mailOptions = {
        from: 'abdulmanankam@gmail.com',
        to: recipientEmail,
        subject: 'Password Reset',
        text: `Your OTP code is: ${otpCode}. Please use this code to reset your password. This code will expire in 2 minutes.`
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};


module.exports = sendPasswordResetEmail;
