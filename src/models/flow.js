export const flowModel = {
  model: {
    type: 'object',
    schema: [
      { name: 'id', type: 'string', required: true },
      { name: 'title', type: 'string', required: true },
      { name: 'description', type: 'string' },
      {
        name: 'questions',
        type: 'array',
        schema: {
          type: 'object',
          schema: [
            { name: 'id', type: 'string', required: true },
            { name: 'type', type: 'string', required: true },
            { name: 'content', type: 'string', required: true },
            { name: 'options', type: 'array' },
          ]
        }
      }
    ]
  }
}