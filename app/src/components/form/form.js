import React from 'react'
import { FormCasa } from 'formcasa'
import { loginForm } from '../../models'


export const Form = () => {
  return (
    <FormCasa
      cascade={ loginForm }
    />
  )
  
}