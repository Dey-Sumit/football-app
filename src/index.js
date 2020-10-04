import React from 'react';
import ReactDOM from 'react-dom';
import 'react-toastify/dist/ReactToastify.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.scss';
import App from './App';
import { StateProvider } from './context/StateProvider';
import reducer, { initialState } from './context/reducer';
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.render(
  <StateProvider reducer={reducer} initialState={initialState}>
    <Router>
      <App />
    </Router>
  </StateProvider>
  ,
  document.getElementById('root')
);

