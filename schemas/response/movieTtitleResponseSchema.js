module.exports = {
  id: '/MovieTitleResponseSchema',
  type: 'object',
  properties: {
    id: {
      type: 'number'
    },
    title: {
      type: 'string'
    },
    year: {
      type: 'string'
    },
    runtime: {
      type: 'string'
    },
    released: {
      type: 'string'
    }
  },
  required: ['id', 'title', 'year', 'runtime', 'released']
}
