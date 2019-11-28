export const questionsFlow = {
  title: 'Test Flow',
  description: 'This is a test flow',
  id: 'flow-1-id',
  questions: [
    {
      id: 'question-1-id',
      type: 'input',
      content: '<p>How much wood, could a wood chuck chuck, if a wood chuck could chuck wood?</p>',
    },
    {
      id: 'question-2-id',
      type: 'select',
      content: '<p>Sally sells sea shells by the sea shore. How many sea shells did sally sell?</p>',
      options: [ 1, 2, 3, 4 ]
    }
  ],
}