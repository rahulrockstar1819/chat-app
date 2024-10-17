import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import './App.css'
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    
  </React.StrictMode>
);