import nodemailer from 'nodemailer'
import logger from '../utils/logger.util.js'
import { config } from '../config/index.js'

const transporter = nodemailer.createTransport({
  host: config.smtpHost,
  port: config.smtpPort,
  secure: config.smtpPort === '465', // true for 465, false for other ports
  auth: {
    user: config.smtpUsername,
    pass: config.smtpPassword,
  },
})

const sendEmail = async (mailOptions) => {
  try {
    const info = await transporter.sendMail({
      from: `"${config.emailFromName || 'No Reply'}" <${config.emailFrom}>`,
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
