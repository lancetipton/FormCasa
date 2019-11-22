import React from 'react'
import '../styles/App.css'
import { Form, Container } from '../components'
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
        <Form />
      </Container>

    </div>
  );
}

export default App;
