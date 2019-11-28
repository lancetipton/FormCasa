import React from 'react'
import '../styles/App.css'
import { Form, Container, Flow } from '../components'
import { loginCascade, loginCatalog, questionsFlow } from '../models'
import { deepClone, reduceObj, isArr, isStr } from 'jsutils'

const makeClone = (cascade) => {
  return reduceObj(deepClone(cascade), (key, value, copy) => {
    if(key === '0') copy[key] = value
    else if(key === '1'){
      copy[key] = deepClone(value)
      copy[key].id && (copy[key].id = `${copy[key].id}-clone`)
      copy[key].htmlFor && ( copy[key].htmlFor = `${copy[key].htmlFor}-clone` )
    }
    else if(key === '2')
      copy[key] = isArr(value) ? value.map(val => isStr(val) ? val : makeClone(val)) : value

    return copy
  })
}

const loginClone = makeClone(loginCascade)

const getLoginCatalog = catalog => {
  console.log(`---------- Index Catalog CB ----------`)
  console.log(catalog)

}

const onInput = (evt) => {
  console.log(`---------- onInput Event ----------`)
  console.log(evt)
}

const onPassword = (evt) => {
  console.log(`---------- onPassword Event ----------`)
  console.log(evt)
}

const events = {
  onChange: {
    input: onInput,
    'password-input': onPassword
  }
}

const App = () => {
  return (
    <div className="App">

      <Container>
        <header className="header">
          <h1>
            Form Casa
          </h1>
        </header>
      </Container>

      <Container>
        <h3>Simple Login Form</h3>
        
        <Form cascade={ loginClone } />
      </Container>
      
      <br/>

      <Container>
        <h3>
          Simple Login Form
          <span>
            ( With catalog, catalog callback, and events )
          </span>
        </h3>

        <Form
          cascade={ loginCascade }
          catalog={ loginCatalog }
          getCatalog={ getLoginCatalog }
          events={ events }
        />
      </Container>

      <Container>
        <h3>
          Form Flow
          <span>
            ( Questions and Answers )
          </span>
        </h3>

        <Flow flow={ questionsFlow } />
      </Container>

    </div>
  );
}

export default App;
