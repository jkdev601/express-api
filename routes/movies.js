const express = require('express')
const { normalizeData } = require('./middleware/normalizeData')
const { fetchMovieDetails } = require('./middleware/fetchMovieDetails')
const { mapApiResponse } = require('./helpers/mapApiResponse')
const { models } = require('../database/config')

const { validateSchema } = require('../schemas/')

const router = express.Router()

router.post('/', normalizeData, fetchMovieDetails, async (req, res) => {
  try {
    const { movieApiResponse } = req
    const { title, year, runtime, released } = mapApiResponse(movieApiResponse)
    const movie = await models.Movie
      .findOrCreate({
        where: { title },
        defaults: { year, runtime, released }
      })
    const raw = movie[0].get({ plain: 'true' })
    validateSchema(raw, '/MovieTitleResponseSchema')
    res.status(200).json(raw)
  } catch (err) {
    console.log(err)
    res.status(400).json(err)
  }
})

router.get('/', async (req, res) => {
  try {
    const movies = await models.Movie
      .findAll({
        attributes: [
          'id',
          'year',
          'title',
          'runtime',
          'released',
          'createdAt',
          'updatedAt'
        ],
        raw: true
      })
    res.status(200).json(movies)
  } catch (err) {
    console.log(err)
    res.status(400).json(err)
  }
})

module.exports = router
