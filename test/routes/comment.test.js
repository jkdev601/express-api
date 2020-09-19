/* globals describe, expect, it, afterAll */
const request = require('supertest')

const { models } = require('../../database/config')
const createApp = require('../utils/createApp')
const commentsRouter = require('../../routes/comments')
const db = require('../../database/config')

const app = createApp(commentsRouter)

describe('Comments Endpoints', () => {
  afterAll(async done => {
    db.close()
    done()
  })
  describe('GET /', () => {
    it('GET / should return 200 status code', async () => {
      const res = await request(app)
        .get('/')
      expect(res.statusCode).toEqual(200)
    })
    it('GET / should return list of comments', async () => {
      await request(app)
        .post('/')
        .send({ nickname: 'John Doe', comment: 'just test comment' })
      const res = await request(app)
        .get('/')
      expect(res.statusCode).toEqual(200)
      expect(res.body).not.toHaveLength(0)
    })
  })

  describe('Post /', () => {
    describe('paylad validation', () => {
      it('to long payload should not pass validation 400', async () => {
        const res = await request(app)
          .post('/')
          .send({ nickname: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pellentesque.' })
        expect(res.statusCode).toEqual(400)
      })
      it('valid comment should return 200', async () => {
        const res = await request(app)
          .post('/')
          .send({ nickname: 'John Doe', comment: 'just test comment' })
        expect(res.statusCode).toEqual(200)
      })
    })
    describe('DB status', () => {
      it('db contains stored record', async () => {
        const res = await request(app)
          .post('/')
          .send({ nickname: 'John Doe', comment: 'just test comment' })
        const comment = await models.Comment.findOne({
          where: {
            id: res.body.id
          },
          raw: true
        })
        expect(res.body.id).toEqual(comment.id)
        expect(res.statusCode).toEqual(200)
      })
    })
  })
})
