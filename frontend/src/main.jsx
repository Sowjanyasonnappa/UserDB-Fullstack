import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="329721506107-4rj3mea4pom4pc3lr4hndoq9n3o1fmjv.apps.googleusercontent.com">
      <App />
      </GoogleOAuthProvider>;
    
  </StrictMode>,
)
