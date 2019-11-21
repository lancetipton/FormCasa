import React from 'react'
import { formModel } from '../../models'

export const Form = props => {
  return (
    <form
      method={props.method}
      encType={props.encType}
      action={prop.action}
      // ---- Need to add forward Ref here ----
      // ref={ref => formComponent = ref}
      className={state.schema.classes.form}
    >
      { props.children }
    </form>
  )
}