import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import AppRouter from './routers/AppRouter.jsx';
import { CartProvider } from './contexts/CartContext.jsx'; // 👈 Import CartProvider

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider> 
      <AppRouter />
    </CartProvider>
  </StrictMode>
);
