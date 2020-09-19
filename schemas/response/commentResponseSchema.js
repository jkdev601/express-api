module.exports = {
  id: '/CommentResponseSchema',
  type: 'object',
  properties: {
    id: {
      type: 'number'
    },
    nickame: {
      type: 'string'
    },
    comment: {
      type: 'string'
    }
  },
  required: ['id', 'nickname', 'comment']
}
