import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';
import './shared/config/styles/globals.scss';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
