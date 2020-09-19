/* global require module */
const { validateSchema } = require('../../schemas')

const normalizeData = async (req, res, next) => {
  try {
    validateSchema(req.body, '/MovieTitleRequestSchema')
    const { title } = req.body
    const normalizedTitle = title.trim()
      .toLowerCase()
      .replace(/\s\s+/g, ' ')
    req.body.title = normalizedTitle
    return next()
  } catch (err) {
    console.log(err)
    res.status(400).json(err)
  }
}

module.exports = {
  normalizeData
}
