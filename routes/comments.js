const express = require('express')
const { models } = require('../database/config')

const { validateSchema } = require('../schemas/')

const router = express.Router()

router.post('/', async (req, res) => {
  try {
    validateSchema(req.body, '/CommentRequestSchema')
    const { nickname, comment: commentPayload } = req.body
    const comment = await models.Comment
      .create({
        nickname,
        comment: commentPayload
      })
    const raw = comment.get({ plain: true })
    validateSchema(raw, '/CommentResponseSchema')
    res.status(200).json(raw)
  } catch (err) {
    console.log(err)
    res.status(400).json(err)
  }
})

router.get('/', async (req, res) => {
  try {
    const comments = await models.Comment
      .findAll({
        attributes: [
          'id',
          'nickname',
          'comment',
          'createdAt',
          'updatedAt'
        ],
        raw: true
      })
    res.status(200).json(comments)
  } catch (err) {
    console.log(err)
    res.status(400).json(err)
  }
})

module.exports = router
