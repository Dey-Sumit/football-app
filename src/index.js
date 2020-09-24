import React from 'react';
import ReactDOM from 'react-dom';
import 'react-toastify/dist/ReactToastify.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.scss';
import App from './App';
import { StateProvider } from './context/StateProvider';
import reducer, { initialState } from './context/reducer';

ReactDOM.render(
  <StateProvider reducer={reducer} initialState={initialState}>
    <App />
  </StateProvider>
  ,
  document.getElementById('root')
);

