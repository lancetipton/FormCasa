import { registerComponents } from 'cascader'
import { isObj } from 'jsutils'
import * as FormComponents from '../components/formComponents'

export class Register {

  /**
  * State of registered components
  */
  registered = false

  /**
  * Registers components with cascade
  * @param {Object} inputs - Key value pairs of component key and React Component
  *
  * @returns {void}
  */
  components = (comps, force) => {
    if(!isObj(comps))
      return console.warn(`Invalid register components object!`, comps)

    if(!force && this.registered)
      return console.warn(
        `Components have already been registered. Pass true as the second argument to force override!`
      )
    
    registerComponents(comps)
    this.registered = true
  }

  /**
  * Registers the default components with cascade
  *
  * @returns {void}
  */
  default = () => {
    if(this.registered)
      return console.warn(
        `Components have already been registered. Pass true as the second argument to force override!`
      )

    registerComponents(FormComponents)
    this.registered = true
  }

}
