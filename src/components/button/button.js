import React from 'react'
import { buttonModel } from '../../models'

export const Button = props => {
  const { children, ...args } = props
  return (
    <button {...args} >
      { children }
    </button>
  )
}