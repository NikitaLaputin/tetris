import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { isMobileDevice } from './utils';
import './index.css';

if (isMobileDevice) {
  document.addEventListener('touchend', e => {
    e.preventDefault();
  });
}

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.register();
