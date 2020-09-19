'use strict'
const { DataTypes } = require('sequelize')
const {
  Model
} = require('sequelize')
module.exports = (sequelize) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  };
  Movie.init({
    title: DataTypes.STRING,
    year: DataTypes.STRING,
    released: DataTypes.STRING,
    runtime: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Movie'
  })
  return Movie
}
