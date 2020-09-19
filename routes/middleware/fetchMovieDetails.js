/* global require module */
const axios = require('axios')

const MOVIE_API_KEY = process.env.MOVIE_API_KEY

const fetchMovieDetails = async (req, res, next) => {
  try {
    const { title } = req.body
    const queryTitle = title.replace(/\s\s+/g, '+')
    const { data } = await axios.get(`http://www.omdbapi.com/?apikey=${MOVIE_API_KEY}&t=${queryTitle}'`)
    const { Title: responseTitle } = data
    const normalizedTitleFromApi = responseTitle ? responseTitle.toLowerCase() : null
    if (data.Response === 'True' && normalizedTitleFromApi === title) {
      req.movieApiResponse = {
        ...data
      }
      return next()
    } else {
      res.status(404).json('movie not found')
    }
  } catch (err) {
    console.log(err)
    res.status(400).json(err)
  }
}

module.exports = {
  fetchMovieDetails
}
