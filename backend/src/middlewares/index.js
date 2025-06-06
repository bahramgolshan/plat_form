import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'
import { apiLimiter } from './rate-limiter.middleware.js'
import { responseEnhancer } from './response-enhancer.middleware.js'
import { config } from '../config/index.js'

export default function applyMiddleware(app) {
  app.use(helmet())
  app.use(cors())
  app.options('*', cors())
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(responseEnhancer)

  if (config.environment !== 'production') {
    app.use(morgan('dev'))
  }

  app.use(apiLimiter)
}
