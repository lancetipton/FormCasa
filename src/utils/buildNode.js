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
export const buildNode = (type, props={}, children=[]) => {
  return {
      0: type,
      1: { id: props.id, key: props.id, ...props },
      2: isArr(children) && children || children && [ children ] || []
    }
}

/**
 * Builds a Catalog with a lookup reference to the passed in ID
 * @param {string} id - Id to add to the catalog
 * @param {string} pos - Position in the cascade when the node exists
 * @param {Object} [catalog={}] - Lookup object that holds extra props about an element
 *
 * @returns {Catalog Object} - Lookup object with lookup reference to the passed in Id
 */
export const buildCatalog = (id, pos, catalog={}) => {
  id = id || uuid()
  catalog[id] = {
    id,
    pos: pos || 0,
    ...(catalog[id] || {}),
  }
  
  return catalog
}

/**
 * Builds a cascade node and matching catalog
 * @param {string} type - Type of cascade node to build
 * @param {Object} [props={}] - Props to add to the cascade node
 * @param {Array} [children=[]] - Cascade node children
 * @param {Object} [catalog={}] - existing Id lookup for cascade nodes
 *
 * @returns {Object} - Object containing the built node, and the matching catalog
 */
export const buildNodeWithCatalog = (type, props={}, children=[], catalog={}) => {

  return {
    cascade: buildNode(type, {  ...props, id: props.id || uuid() }, children),
    catalog: buildCatalog(props.id, props.pos, catalog)
  }
}