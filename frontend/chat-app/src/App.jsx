import Loginpage from './pages/login/login-page.jsx'
import SignUp from './pages/signup/signup.jsx'
import Home from './pages/home/Home-page.jsx'
import MessageBox from './components/Conversation-Page/Messege-box.jsx'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './context/AuthContext.jsx';
import TestSocket from '../../chat-app/src/pages/Test/TestSocket.jsx' // Add this





const App = () => {
  const {authUser}= useAuthContext();


  return (
    <BrowserRouter>
        <Routes>
         <Route path="/app/login" element={authUser ? <Navigate to="/app/home" /> : <Loginpage />} />
          <Route path="/app/signup" element={authUser ? <Navigate to="/app/login" /> : <SignUp />} />
          <Route path="/app/home" element={authUser ? <Home /> : <Navigate to="/app/login" />} />
          <Route path="/app/messagebox" element={authUser ? <MessageBox /> : <Navigate to="/app/login" />} />
          <Route path="/app/test-socket" element={authUser ? <TestSocket /> : <Navigate to="/app/login" />} />
        </Routes>
    </BrowserRouter>
   
  );
}

export default App;
