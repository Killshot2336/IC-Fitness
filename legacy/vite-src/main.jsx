import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './demo.css';

const root = document.getElementById('tier-demo-root');
if (root) {
  createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
