import { validate } from 'jsvalidator'
import { flowModel } from '../models'
import { buildNode } from './buildNode'

const buildFlowHeader = (title, description, id) => {
  const headerDesc = buildNode('p', { id: `${id}-flow-header-desc` }, [ description ])
  const headerTitle =  buildNode('h3', { id: `${id}-flow-header-title` }, [ title ])

  return buildNode('div', { id: `${id}-flow-header` }, [ headerTitle, headerDesc ])
}

const buildAnswerInput = (question, flowId) => {
  const { type, options } = question
  const wrapper = buildNode('div', { id: `${question.id}-answer-content`, className: 'answer-content' }, [])
  let input

  switch(type){
    case 'select': {
      wrapper[2] = [buildNode(
        'select',
        { id: `${question.id}-answer-input`, className: 'answer answer-input' },
        options.map(option => buildNode('option', { value: option }, option))
      )]

      return wrapper
    }
    case 'input':
    default: {
      wrapper[2] = [buildNode(
        'input',
        { id: `${question.id}-answer-input`, className: 'answer answer-input' },
        []
      )]

      return wrapper
    }
  }

  return wrapper
}

const buildQuestion = (question, flowId) => (
  buildNode(
    'li',
    { id: question.id, className: 'question' },
    [
      buildNode(
        'div',
        { id: `${question.id}-question-content`, className: 'question-content', [`data-flow-id`]: flowId },
        [ question.content ]
      ),
      buildAnswerInput(question, flowId)
    ]
  )
)

const buildQuestions = (questions, id) => (
  buildNode(
    'div',
    { id: `${id}-questions`, className: 'questions' },
    [
      buildNode(
        'ul',
        { id: `${id}-questions-list`, className: 'questions-list' },
        questions.map(question => buildQuestion(question, id))
      )
    ]
  )
)

export const flowToCascade = flow => {

  // Ensure we have a valid flow model
  const validated = validate(flow, flowModel.model)

  // Ensure the flow was validated
  if(validated.success !== true) return validated.err

  // Create the cascade object
  const { title, description, id, questions } = flow

  // Build the header elements
  const cascade = buildNode(
    'div',
    { id, className: 'flow' },
    [ buildFlowHeader(title, description, id), buildQuestions(questions, id) ]
  )

  return { cascade }
}