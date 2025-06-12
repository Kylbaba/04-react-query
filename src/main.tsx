import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// import './index.css'
import App from './components/App/App.tsx';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
