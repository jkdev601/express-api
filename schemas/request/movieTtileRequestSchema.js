module.exports = {
  id: '/MovieTitleRequestSchema',
  type: 'object',
  properties: {
    title: {
      type: 'string',
      maxLength: 100
    }
  },
  required: ['title']
}
