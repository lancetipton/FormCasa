import React from 'react'
import { inputModel } from '../../models'

export const Input = props => {
  const { children, ...args } = props

  return (
    <input { ...args }  />
  )
}