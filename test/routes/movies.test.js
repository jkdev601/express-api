/* globals describe, expect, it, afterAll, jest, afterEach, beforeEach */
jest.mock('axios')
const axios = require('axios')
const request = require('supertest')
const { models } = require('../../database/config')
const createApp = require('../utils/createApp')
const moviesRouter = require('../../routes/movies')
const db = require('../../database/config')
const mockedApiResponse = require('../_mocks_/movie_api')

const app = createApp(moviesRouter)

describe('Movies Endpoints', () => {
  afterAll(async done => {
    db.close()
    done()
  })
  describe('GET /', () => {
    afterEach(() => {
      jest.clearAllMocks()
    })
    it('GET / should return 200 status code', async () => {
      const res = await request(app)
        .get('/')
      expect(res.statusCode).toEqual(200)
    })

    it('GET / should return list of movies', async () => {
      axios.get.mockImplementationOnce(() => Promise.resolve(mockedApiResponse.italianSpiderman))
      await request(app)
        .post('/')
        .send({ title: 'Italian Spiderman' })
      const res = await request(app)
        .get('/')
      expect(res.statusCode).toEqual(200)
      expect(res.body).not.toHaveLength(0)
    })

    it('GET / should return 404 for wrong path', async () => {
      const res = await request(app)
        .get('/custom')
      expect(res.statusCode).toEqual(404)
    })

    describe('Post /', () => {
      beforeEach(() => {
        jest.resetAllMocks()
      })
      describe('paylad validation', () => {
        it('to long payload should not pass validation 400', async () => {
          axios.get.mockImplementationOnce(() => Promise.resolve(mockedApiResponse.italianSpiderman))
          const res = await request(app)
            .post('/')
            .send({ title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pellentesque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pellentesque.' })
          expect(res.statusCode).toEqual(400)
        })

        it('should pass validation', async () => {
          axios.get.mockImplementationOnce(() => Promise.resolve(mockedApiResponse.italianSpiderman))
          const res = await request(app)
            .post('/')
            .send({ title: 'Italian Spiderman' })
          expect(res.statusCode).toEqual(200)
        })

        it('should return 200 with response payload', async () => {
          axios.get.mockImplementationOnce(() => Promise.resolve(mockedApiResponse.italianSpiderman))
          const res = await request(app)
            .post('/')
            .send({ title: 'italian      spideRman   ' })
          expect(res.statusCode).toEqual(200)
        })

        it('should return 404 for request with typo', async () => {
          axios.get.mockImplementationOnce(() => Promise.resolve(mockedApiResponse.italianSpiderman))
          const res = await request(app)
            .post('/')
            .send({ title: 'italian spidernan' })
          expect(res.statusCode).toEqual(404)
        })
      })
      describe('DB status', () => {
        beforeEach(() => {
          jest.resetAllMocks()
        })

        it('db contains stored record', async () => {
          axios.get.mockImplementationOnce(() => Promise.resolve(mockedApiResponse.bond))
          const res = await request(app)
            .post('/')
            .send({ title: 'James Bond' })
          const movie = await models.Movie.findOne({
            where: {
              id: res.body.id
            },
            raw: true
          })
          expect(res.statusCode).toEqual(200)
          expect(res.body.id).toEqual(movie.id)
        })

        it('should return new movie resource', async () => {
          axios.get.mockImplementationOnce(() => Promise.resolve(mockedApiResponse.bond))
          const res = await request(app)
            .post('/')
            .send({ title: 'James Bond' })
          expect(res.statusCode).toEqual(200)
          // expect(res.body.title).toEqual('James Bond')
        })

        it('should not create resource twice if exists', async () => {
          axios.get.mockImplementation(() => Promise.resolve(mockedApiResponse.scary))
          await request(app)
            .post('/')
            .send({ title: 'Scary Movie 4' })
          const res = await request(app)
            .post('/')
            .send({ title: 'Scary Movie 4' })
          const movies = await models.Movie.findAll({
            where: {
              title: 'Scary Movie 4'
            },
            raw: true
          })
          expect(res.statusCode).toEqual(200)
          expect(movies).toHaveLength(1)
        })
      })
    })
  })
})
