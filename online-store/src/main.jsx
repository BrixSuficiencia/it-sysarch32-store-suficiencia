import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from 'react-dom/client' instead of 'react-dom'
import './index.css';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.css';

const root = document.getElementById('root');

// Create a root
const reactRoot = createRoot(root);

// Render the app inside the root
reactRoot.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
