import { StrictMode,  } from 'react';
import { createRoot } from 'react-dom/client';
import MyContext from './components/MyContext.tsx';
import './index.css';

import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>  
    <MyContext > 
      <App/> 
    </MyContext>   
  </StrictMode>
)
