import nodemailer from 'nodemailer';

const forgotPasswordEmail = async (info) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const { name, email, token } = info;

    const data = await transport.sendMail({
        from: 'AniVerse',
        to: email,
        subject: 'AniVerse - Password Recovery',
        text: 'AniVerse - Password Recovery',
        html: `
            <p>Hi ${name}, you requested a password change.</p>
            <p>Follow the link below to generate a new password: 
                <a href="${process.env.FRONTEND_URL}/openid/forgot-password/${token}">Recover Password</a>
            </p>

            <p>If you didn't create the account, please ignore this message</p>
        `
    });

    console.log("Message sent: %s", data.messageId);
}

export default forgotPasswordEmail;