import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import './App.css'
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { SocketContextProvider } from './context/SocketContext.jsx';
import { HeroUIProvider } from '@heroui/react';
import { WebRTCDebugProvider } from './context/WebRTCDebugContext';
import WebRTCTest from './components/WebRTCTest';




const rootElement = document.getElementById('root')
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <AuthContextProvider>
        <SocketContextProvider>
          <HeroUIProvider>
            <WebRTCDebugProvider>
            <App />
            </WebRTCDebugProvider>
          </HeroUIProvider>
        </SocketContextProvider>
      </AuthContextProvider>
  </React.StrictMode>
);