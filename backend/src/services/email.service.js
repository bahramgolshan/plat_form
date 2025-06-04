import nodemailer from 'nodemailer'
import logger from '../utils/logger.js'
import { config } from '../config/index.js'

const transporter = nodemailer.createTransport({
  host: config.port.smtpHost,
  port: config.port.smtpPort,
  secure: config.port.smtpPort === '465', // true for 465, false for other ports
  auth: {
    user: config.port.smtpUsername,
    pass: config.port.smtpPassword,
  },
})

const sendEmail = async (mailOptions) => {
  try {
    const info = await transporter.sendMail({
      from: `"${config.port.emailFrom_NAME || 'No Reply'}" <${config.port.emailFrom}>`,
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
