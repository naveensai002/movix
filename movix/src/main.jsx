import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.scss';
import { Toaster, toast } from 'sonner';
import { store } from './store/store.js';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Toaster position='top-left' richColors />
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
