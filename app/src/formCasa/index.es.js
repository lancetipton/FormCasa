import React from 'react';
import { isObj, isStr, get, capitalize, softFalsy, isColl, eitherObj, isArr, isFunc, deepMerge, uuid } from 'jsutils';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

var formModel = {
  cascade: {}
};

var Form = function Form(props) {
  return React.createElement("form", {
    method: props.method,
    encType: props.encType,
    action: props.action
  }, props.children);
};

function _classCallCheck$1(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
function _defineProperty$1(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function ownKeys$1(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2$1(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys$1(source, true).forEach(function (key) {
        _defineProperty$1(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys$1(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
var getIdentityId = function getIdentityId(cascade) {
  var identity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var parent = arguments.length > 2 ? arguments[2] : undefined;
  if (!isObj(parent) || !isObj(cascade)) return;
  var props = parent.props,
      parentCascade = parent.cascade,
      CASCADE_ROOT = parent.CASCADE_ROOT;
  var parentPos = get(props, ['pos']);
  if (!isObj(parentCascade) || !isStr(parentPos)) return !CASCADE_ROOT && console.warn("Parent cascade does not exist!", parent, cascade);
  var pos = parentCascade[2].indexOf(cascade);
  return softFalsy(pos) ? identity["".concat(parentPos, ".2.").concat(pos)] : console.warn("Cascade node pos not found!", parent, cascade);
};
var buildCascadeProps = function buildCascadeProps(cascade, metadata, parent) {
  var inlineProps = get(cascade, ['1'], {});
  var identity = metadata.identity,
      catalog = metadata.catalog;
  var cascadeId = findCascadeId(cascade, inlineProps, identity, parent);
  var cascadeProps = !cascadeId ? inlineProps : deepMerge(get(parent, ['props', 'children', cascadeId]), catalog[cascadeId], inlineProps);
  cascadeProps.key = cascadeProps.key || cascadeProps.id || cascadeProps.pos;
  return cascadeProps;
};
var getCascadeId = function getCascadeId(cascade, props, id) {
  return isStr(id) && id || isObj(cascade) && (get(cascade, ['1', 'id']) || !props && get(cascade, ['id'])) || get(props, ['id']);
};
var findCascadeId = function findCascadeId(cascade, props, identity, parent) {
  return getCascadeId(cascade, props) || isObj(identity) && getIdentityId(cascade, identity, parent);
};
var getCatalogProps = function getCatalogProps(catalog, id) {
  return !isObj(catalog) || !isStr(id) ? console.warn("getCatalogProps requires a catalog object, and an id!", catalog, id) : catalog[id];
};
var getAltRender = function getAltRender(catalog, id) {
  var catalogProps = getCatalogProps(catalog, id);
  return isObj(catalogProps) && (catalogProps.altRender || catalogProps.render);
};
var components = {};
var Registry =
function () {
  function Registry() {
    _classCallCheck$1(this, Registry);
  }
  _createClass(Registry, [{
    key: "register",
    value: function register(compList) {
      if (!isObj(compList)) return console.warn("Cascade register method only accepts an object as it's first argument!");
      components = _objectSpread2$1({}, components, {}, compList);
    }
  }, {
    key: "unset",
    value: function unset(key) {
      key ? delete components[key] : components = {};
    }
  }, {
    key: "get",
    value: function get(key) {
      return key && components[key] || components;
    }
  }, {
    key: "find",
    value: function find(cascade, props, catalog, identity, parent) {
      var cascadeId = !isObj(identity) || !isObj(parent) ? getCascadeId(cascade, props) : findCascadeId(cascade, props, identity, parent);
      var cascadeKey = cascadeId && getAltRender(catalog, cascadeId);
      var type = cascade[0];
      return components[cascadeKey] || components[capitalize(type)] || components[type] || components[cascadeId] || type;
    }
  }]);
  return Registry;
}();
var registry = new Registry();
var registerComponents = function registerComponents() {
  return registry.register.apply(registry, arguments);
};
var findComponent = function findComponent() {
  return isFunc(registry.customFind) ? registry.customFind.apply(registry, arguments) : registry.find.apply(registry, arguments);
};
var getRenderEl = function getRenderEl(cascade, metadata, props, parent) {
  var catalog = metadata.catalog,
      identity = metadata.identity;
  return React.createElement(findComponent(cascade, props, catalog, identity, parent), props, renderCascade(cascade[2], metadata, {
    cascade: cascade,
    parent: parent,
    props: props
  }));
};
var renderCascade = function renderCascade(cascade, metadata, parent) {
  if (!isColl(cascade)) return cascade;
  if (cascade[0] === 'CASCADE_LOADING') return null;
  return isArr(cascade) ? cascade.map(function (child) {
    return renderCascade(child, metadata, parent);
  }) : cascade[0] && getRenderEl(cascade, metadata, buildCascadeProps(cascade, metadata, parent), parent) || null;
};
var Cascader = function Cascader(props) {
  if (!isObj(props) || !isColl(props.cascade)) {
    console.warn("Cascader requires a cascade object as a prop!", props);
    return null;
  }
  return renderCascade(props.cascade, {
    catalog: eitherObj(props.catalog, {}),
    styles: props.styles,
    identity: props.identity
  }, _objectSpread2$1({}, eitherObj(props.parent, {}), {
    CASCADE_ROOT: true
  }));
};

var Button = function Button(props) {};

var Input = function Input(props) {
  console.log("---------- props ----------");
  console.log(props);
  return React.createElement("input", null);
};

var Radio = function Radio(props) {};

var Select = function Select(props) {};

var Textbox = function Textbox(props) {};



var FormComponents = /*#__PURE__*/Object.freeze({
  Button: Button,
  Form: Form,
  Input: Input,
  Radio: Radio,
  Select: Select,
  Textbox: Textbox
});

var Register = function Register() {
  var _this = this;
  _classCallCheck(this, Register);
  _defineProperty(this, "registered", false);
  _defineProperty(this, "components", function (comps, force) {
    if (!isObj(comps)) return console.warn("Invalid register components object!", comps);
    if (!force && _this.registered) return console.warn("Components have already been registered. Pass true as the second argument to force override!");
    registerComponents(comps);
    _this.registered = true;
  });
  _defineProperty(this, "default", function () {
    if (_this.registered) return console.warn("Components have already been registered. Pass true as the second argument to force override!");
    registerComponents(FormComponents);
    _this.registered = true;
  });
};

var buildNode = function buildNode(type) {
  var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var children = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var catalog = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var id = uuid();
  return {
    cascade: {
      0: type,
      1: _objectSpread2({
        id: id,
        key: id
      }, props),
      2: isArr(children) && children || [children]
    },
    catalog: _objectSpread2({}, catalog, _defineProperty({}, id, {
      id: id,
      pos: 0
    }))
  };
};

var register = new Register();
var formError = function formError() {
  return console.warn("Invalid form model. Model be an array of inputs, or an object key of '0' for the type") || null;
};
var Cascade = function Cascade(props) {
  var cascade = props.cascade,
      catalog = props.catalog,
      styles = props.styles,
      identity = props.identity;
  return React.createElement(Cascader, {
    cascade: cascade,
    catalog: catalog,
    styles: styles,
    identity: identity
  });
};
var addFormRoot = function addFormRoot(props) {
  var cascade = props.cascade,
      catalog = props.catalog,
      args = _objectWithoutProperties(props, ["cascade", "catalog"]);
  var formCascade = buildNode(formModel.cascade[0], formModel.cascade[1], props.cascade, props.catalog);
  return React.createElement(Cascade, _extends({}, args, formCascade));
};
var buildForm = function buildForm(props) {
  !register.registered && register["default"]();
  var cascade = props.cascade;
  return isArr(cascade) || cascade['0'] !== 'form' ? addFormRoot(props) : React.createElement(Cascade, props);
};
var FormCasa = function FormCasa(props) {
  var cascade = props.cascade;
  return !isArr(cascade) && !isObj(cascade) || isObj(cascade) && !cascade['0'] ? formError() : buildForm(props);
};
FormCasa.register = function (comps) {
  register.components(comps);
};

export { FormCasa, buildForm };
