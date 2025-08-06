import { createRoot } from 'react-dom/client';
import App from './App';
import React from 'react';
import './index.css';

const container = document.getElementById('root');
if (!container) throw new Error('Root container missing');

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
