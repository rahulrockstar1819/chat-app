import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import './App.css'
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { SocketContextProvider } from './context/SocketContext.jsx';




const rootElement = document.getElementById('root')
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <AuthContextProvider>
        <SocketContextProvider>
          <App />
        </SocketContextProvider>
      </AuthContextProvider>
  </React.StrictMode>
);