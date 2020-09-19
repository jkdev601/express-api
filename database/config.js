
const Sequelize = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

const modelDefiners = [
  require('./models/movie'),
  require('./models/comment')
]

for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize)
}

// We export the sequelize connection instance to be used around our app.
module.exports = sequelize
