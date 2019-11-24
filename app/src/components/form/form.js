import React from 'react'
import { FormCasa } from 'formcasa'
import { loginCascade, loginCatalog } from '../../models'


const getCatalog = catalog => {

  console.log(`---------- catalog item not is equal ----------`)
  console.log(loginCatalog['12345'] === catalog['12345'])

  console.log(`---------- catalog item is equal ----------`)
  console.log(loginCatalog['password-wrapper'] === catalog['password-wrapper'])

}

export const Form = () => {
  return (
    <FormCasa
      cascade={ loginCascade }
      catalog={ loginCatalog }
      getCatalog={ getCatalog }
    />
  )
  
}