import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated import
import { Provider } from 'react-redux';
import store from './app/store.ts';
import App from './App.js';
import './index.css';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container!); // Use createRoot instead of render

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
