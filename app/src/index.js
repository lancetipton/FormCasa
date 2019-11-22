import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './screens/App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
