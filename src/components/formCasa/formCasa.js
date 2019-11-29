import React from 'react'
import { Form } from '../form'
import { Register } from '../../services'
import { buildNodeWithCatalog } from '../../utils'
import { Cascader } from 'cascader'
import { isArr, isObj } from 'jsutils'
import { formModel } from '../../models'

const register = new Register()

/**
 * Error helper if the passed in model is invalid
 *
 * @returns {void}
 */
const formError = () => {
  return console.warn(
    `Invalid form model. Model be an array of inputs, or an object key of '0' for the type`
  ) || null
}

/**
 * Renders the Cascade component
 * @param {*} props
 * @param {Object} props.cascade - Cascade model object
 *
 * @returns {React Component} - Rendered Cascade Component
 */
const Cascade = props => {
  const { cascade, catalog, config, events, getCatalog, styles, } = props
  return (
    <Cascader
      cascade={ cascade }
      catalog={ catalog }
      events={ events }
      styles={ styles }
      getCatalog={ getCatalog }
      config={ config }
    />
  )
}

/**
 * Adds the form model to the passed incascade and builds the FormRoot 
 * @param {Object} props
 * @param {Object} props.cascade - Cascade model object
 *
 * @returns
 */
const addFormRoot = props => {
  // Get the cascade (children) and the catalog from the props
  const { cascade, catalog, ...args } = props

  // Build the root cascade node from the formModel
  const formCascade = buildNodeWithCatalog(
    formModel.cascade[0],
    formModel.cascade[1],
    props.cascade,
    props.catalog
  )

  return (<Cascade { ...args } { ...formCascade } />)
}

/**
 * Builds the form based on the passed in props
 * <br> Ensure the model is correct, if invalid model log the error
 * <br> Otherwise figure out how to build the form based on props.model
 * <br> If the model is an array or the root element is not form, build the form root object
 * @param {Object} props
 * @param {Object} props.cascade - Cascade model object
 *
 * @returns {React Component} - Built Form Component
 */
export const buildForm = props => {
  !register.registered && register.default()
  const { cascade } = props

  return isArr(cascade) || cascade['0'] !== 'form'
    ? addFormRoot(props)
    : ( <Cascade { ...props } /> )

}

/**
 * FormCasa entry component. Root Component that renders the form
 * @param {Object} props - passed from the parent
 * @param {Object} props.cascade - Cascade model object
 *
 * @returns {React Component} - Rendered FormCasa Component
 */
export const FormCasa = props => {
  const { cascade } = props
  return !isArr(cascade) && !isObj(cascade) || (isObj(cascade) && !cascade['0'])
    ? formError()
    : buildForm(props)
}

FormCasa.register = (comps) => {
  register.components(comps)
}
