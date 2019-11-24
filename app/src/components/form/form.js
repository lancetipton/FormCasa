import React from 'react'
import { FormCasa } from 'formcasa'

export const Form = (props) => {
  const { cascade, catalog, getCatalog, events } = props
  return (
    <FormCasa
      cascade={ cascade }
      catalog={ catalog }
      events={ events }
      getCatalog={ getCatalog }
    />
  )
}