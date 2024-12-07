import 'server-only'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: 'smtp.office365.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
})

export async function sendPasswordResetEmail(email: string, resetToken: string) {
  const resetUrl = `https://www.bherila.net/my-account/reset-password/?key=${resetToken}`

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Password Reset Request',
    text: `Click this link to reset your password: ${resetUrl}\n\nThis link will expire in 5 minutes.`,
    html: `<p>Click <a href="${resetUrl}">here</a> to reset your password.</p><p>This link will expire in 5 minutes.</p>`,
  })
}
