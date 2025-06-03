import nodemailer from 'nodemailer'
import logger from '../utils/logger.js'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
})

const sendEmail = async (mailOptions) => {
  try {
    const info = await transporter.sendMail({
      from: `"${process.env.EMAIL_FROM_NAME || 'No Reply'}" <${process.env.EMAIL_FROM}>`,
      ...mailOptions,
    })

    logger.info(`Email sent: ${info.messageId}`)
    return info
  } catch (error) {
    logger.error('Error sending email:', error)
    throw error
  }
}

export default { sendEmail }
