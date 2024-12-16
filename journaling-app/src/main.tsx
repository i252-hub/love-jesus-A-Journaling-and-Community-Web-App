import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Navbar from './components/Navbar'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Navbar
    Journal='Journal'
    Community = 'Community'
    About = 'About'
    SignIn = 'Sign-in' />
  </StrictMode>,
)
