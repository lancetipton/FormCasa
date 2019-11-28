import { validate } from 'jsvalidator'
import { flowModel } from '../models'

const buildEl = (type, props, children) => {
  return { 0: type, 1: props, 2: children }
}

const buildFlowHeader = (title, description, id) => {
  const headerDesc = buildEl('p', { id: `${id}-flow-header-desc` }, [ description ])
  const headerTitle =  buildEl('h3', { id: `${id}-flow-header-title` }, [ title ])

  return buildEl('div', { id: `${id}-flow-header` }, [ headerTitle, headerDesc ])
}

const buildAnswerInput = (question, flowId) => {
  const { type, options } = question
  const wrapper = buildEl('div', { id: `${question.id}-answer-content`, className: 'answer-content' }, [])
  let input

  switch(type){
    case 'select': {
      wrapper[2] = [buildEl(
        'select',
        { id: `${question.id}-answer-input`, className: 'answer answer-input' },
        options.map(option => buildEl('option', { value: option }, option))
      )]

      return wrapper
    }
    case 'input':
    default: {
      wrapper[2] = [buildEl(
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
  buildEl(
    'li',
    { id: question.id, className: 'question' },
    [
      buildEl(
        'div',
        { id: `${question.id}-question-content`, className: 'question-content', [`data-flow-id`]: flowId },
        [ question.content ]
      ),
      buildAnswerInput(question, flowId)
    ]
  )
)

const buildQuestions = (questions, id) => (
  buildEl(
    'div',
    { id: `${id}-questions`, className: 'questions' },
    [
      buildEl(
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
  const cascade = buildEl(
    'div',
    { id, className: 'flow' },
    [ buildFlowHeader(title, description, id), buildQuestions(questions, id) ]
  )

  return { cascade }
}