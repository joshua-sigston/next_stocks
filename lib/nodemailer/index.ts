import nodemailer from 'nodemailer'
import {WELCOME_EMAIL_TEMPLATE} from "@/lib/nodemailer/templates";

// Create a reusable transporter object using Gmail as the service
// This transporter will handle sending emails
export const transporter = nodemailer.createTransport({
    service: 'gmail', // Use Gmail service
    auth: {
        user: process.env.MY_EMAIL,     // Gmail account email (from environment variables)
        pass: process.env.MY_PASSWORD   // Gmail app password (from environment variables)
    }
})

/**
 * Sends a welcome email to a new user
 * @param {WelcomeEmailData} param0 - Object containing user's email, name, and intro message
 */
export const sendWelcomeEmail = async ({email, name, intro}: WelcomeEmailData) => {
    // Prepare the HTML email by replacing placeholders in the template
    const htmlTemplate = WELCOME_EMAIL_TEMPLATE
        .replace("{{name}}", name)   // Replace {{name}} with user's actual name
        .replace("{{intro}}", intro) // Replace {{intro}} with custom intro text

    // Configure the email options
    const mailOptions = {
        from: `"Signalist" <travelingtramp@gmail.com>`, // Sender name and email
        to: email,                                      // Recipient email
        subject: "Welcome to Signalist!",               // Email subject line
        text: "Thank You for joining Signalist!",       // Plain-text fallback content
        html: htmlTemplate                              // HTML content of the email
    }

    // Send the email using the transporter
    await transporter.sendMail(mailOptions)
}
