import nodemailer from 'nodemailer'
import {WELCOME_EMAIL_TEMPLATE} from "@/lib/nodemailer/templates";

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_PASSWORD
    }
})

export const sendWelcomeEmail = async ({email, name, intro}: WelcomeEmailData) => {
    const htmlTemplate = WELCOME_EMAIL_TEMPLATE
        .replace("{{name}}", name)
        .replace("{{intro}}", intro)

    const mailOptions = {
        from: `"Signalist" <travelingtramp@gmail.com>`,
        to: email,
        subject: "Welcome to Signalist!",
        text: "Thank You for joiningSignalist!",
        html: htmlTemplate
    }

    await transporter.sendMail(mailOptions)
}