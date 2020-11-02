import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './app/store';
import { Provider } from 'react-redux';
import { StylesProvider } from '@material-ui/core/styles'

ReactDOM.render(
  <React.StrictMode>
    <StylesProvider injectFirst>
      <Provider store={store}>
          <App />
      </Provider>
    </StylesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);