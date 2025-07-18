import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import LandingPage from './LandingPage.jsx';
import InfoPage from './InfoPage.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <LandingPage/>
    <InfoPage/>
  </StrictMode>
)
