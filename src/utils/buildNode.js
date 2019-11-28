import { uuid, isArr } from 'jsutils'

/**
 * Builds a Cascade node in the proper formt
 * @param {string} type - Type of UI element to build
 * @param {Object} [props={}] - UI element properties
 * @param {Array} [children=[]] - UI element children of the Type element
 * @param {Object} [catalog={}] - Lookup object that holds extra props about an element
 *
 * @returns {Cascade Node} - Build node in cascade format
 */
export const buildNode = (type, props={}, children=[], catalog={}) => {
  const id = uuid()

  return {
    cascade: {
      0: type,
      1: { id, key: id, ...props },
      2: isArr(children) && children || children && [ children ] || []
    },
    catalog: {
      ...catalog,
      [id]: { id, pos: 0 }
    }
  }
}