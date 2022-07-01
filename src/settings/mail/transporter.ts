import nodemailer from 'nodemailer';

export default nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    auth: {
        user: "johannes.kling@outlook.de",
        pass: "Johannes13!"
    }
})