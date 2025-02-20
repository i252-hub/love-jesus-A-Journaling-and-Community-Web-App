import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes";
import './index.css'


import { CountProvider } from '../src/components/Context';
import AuthProvider from './components/AuthContext';

const router = createBrowserRouter(routes);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
   <CountProvider>
   <RouterProvider router={router} />
    </CountProvider>
    </AuthProvider>
  </StrictMode>,
)
