const nodemailer = require('nodemailer');

const sendNotificationEmail = async (userEmail, doctorName, appointmentStatus) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail', 
            auth: {
                user: 'your-email@gmail.com',
                pass: 'your-email-password',
            },
        });

        const mailOptions = {
            from: 'your-email@gmail.com',
            to: userEmail,
            subject: 'Appointment Update',
            text: `Hello,

Your appointment request with Dr. ${doctorName} has been updated. The current status is: ${appointmentStatus}.

Thank you for using our service!
            `,
        };

        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully!');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = sendNotificationEmail
