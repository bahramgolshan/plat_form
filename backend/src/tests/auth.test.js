import request from 'supertest'
import app from '../app.js'
import db from '../models/index.js'
import { v4 as uuidv4 } from 'uuid'

const { User, RefreshToken } = db

describe('Auth API', () => {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true })
  })

  afterAll(async () => {
    await db.sequelize.close()
  })

  describe('POST /api/v1/auth/register', () => {
    it('should register a new user', async () => {
      const res = await request(app).post('/api/v1/auth/register').send({
        email: 'test@example.com',
        password: 'password123',
        firstName: 'Test',
        lastName: 'User',
      })

      expect(res.statusCode).toEqual(201)
      expect(res.body).toHaveProperty('user')
      expect(res.body).toHaveProperty('tokens')
      expect(res.body.user.email).toEqual('test@example.com')
    })

    it('should not register with duplicate email', async () => {
      const res = await request(app).post('/api/v1/auth/register').send({
        email: 'test@example.com',
        password: 'password123',
        firstName: 'Test',
        lastName: 'User',
      })

      expect(res.statusCode).toEqual(400)
    })
  })

  describe('POST /api/v1/auth/login', () => {
    it('should login with correct credentials', async () => {
      const res = await request(app).post('/api/v1/auth/login').send({
        email: 'test@example.com',
        password: 'password123',
      })

      expect(res.statusCode).toEqual(200)
      expect(res.body).toHaveProperty('user')
      expect(res.body).toHaveProperty('tokens')
    })

    it('should not login with incorrect password', async () => {
      const res = await request(app).post('/api/v1/auth/login').send({
        email: 'test@example.com',
        password: 'wrongpassword',
      })

      expect(res.statusCode).toEqual(401)
    })
  })

  describe('POST /api/v1/auth/refresh-tokens', () => {
    it('should refresh access token with valid refresh token', async () => {
      const user = await User.findOne({ where: { email: 'test@example.com' } })
      const refreshToken = await RefreshToken.create({
        token: 'valid-refresh-token',
        user_id: user.id,
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      })

      const res = await request(app).post('/api/v1/auth/refresh-tokens').send({
        refreshToken: refreshToken.token,
      })

      expect(res.statusCode).toEqual(200)
      expect(res.body).toHaveProperty('access')
      expect(res.body).toHaveProperty('refresh')
    })

    it('should not refresh access token with invalid refresh token', async () => {
      const res = await request(app).post('/api/v1/auth/refresh-tokens').send({
        refreshToken: 'invalid-refresh-token',
      })

      expect(res.statusCode).toEqual(401)
    })
  })
})
