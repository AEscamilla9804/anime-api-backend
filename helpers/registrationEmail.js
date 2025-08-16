import nodemailer from 'nodemailer';

const emailCreation = async ({ name, email, token }) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const data = await transport.sendMail({
        from: 'AniVerse',
        to: email,
        subject: 'User Account Confirmation',
        text: 'User Account Confirmation',
        html: `
            <p>Welcome ${name}, confirm your AniVerse account.</p>
            <p>Your account is almost ready, the only thing left to do is to verify it by accessing the following link: 
                <a href="${process.env.FRONTEND_URL}/openid/confirm/${token}">Confirm Account</a>
            </p>

            <p>If you didn't create the account, please ignore this message</p>
        `
    });

    console.log("Message sent: %s", data.messageId);
}

export default emailCreation;