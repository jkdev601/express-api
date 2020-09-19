
const Sequelize = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres'
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
