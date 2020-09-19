module.exports = {
  id: '/CommentRequestSchema',
  type: 'object',
  properties: {
    nickname: {
      type: 'string',
      maxLength: 50
    },
    comment: {
      type: 'string',
      maxLength: 250
    }
  },
  required: ['nickname', 'comment']
}
