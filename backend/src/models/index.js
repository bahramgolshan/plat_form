import fs from 'fs'
import path from 'path'
import { Sequelize } from 'sequelize'
import dbConfig from '../config/db.config.js'

const basename = path.basename(import.meta.url)
const db = {}

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  dbConfig.options
)

fs.readdirSync(new URL('.', import.meta.url))
  .filter((file) => file.endsWith('.model.js') && file !== basename)
  .forEach(async (file) => {
    const modelImport = await import(`./${file}`)
    const model = modelImport.default(sequelize, Sequelize)
    db[model.name] = model
  })

Object.values(db).forEach((model) => {
  if (model.associate) model.associate(db)
})

db.sequelize = sequelize
db.Sequelize = Sequelize

export { db, sequelize, Sequelize }
