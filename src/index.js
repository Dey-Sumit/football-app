import React from 'react';
import ReactDOM from 'react-dom';

//REDUX
import { Provider } from 'react-redux'
import store from './redux/store'

import { BrowserRouter as Router } from 'react-router-dom'

//CSS files
import 'react-toastify/dist/ReactToastify.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.scss';

import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
  ,
  document.getElementById('root')
);

