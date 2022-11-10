import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';
import { ApiProvider } from '@reduxjs/toolkit/query/react';
import { todoApi } from './store/store';

ReactDOM.render(
  <React.StrictMode>
    <ApiProvider api={todoApi}>
      <App />
    </ApiProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
