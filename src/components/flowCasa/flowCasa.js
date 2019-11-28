import React from 'react'
import { flowToCascade } from '../../utils'
import { isStr } from 'jsutils'
import { FormCasa } from '../formCasa'

export const FlowCasa = props => {

  const { cascade } = flowToCascade(props.flow)

  return !cascade || isStr(cascade)
    ? console.warn(`Invalid props.flow object passed to Flow component`, props.flow, cascade)
    : (<FormCasa cascade={ cascade } />)
}