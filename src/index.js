import React from 'react';
import ReactDOM from 'react-dom/client'; // Use the `react-dom/client` module
import App from './App';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement); // Create a root

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
