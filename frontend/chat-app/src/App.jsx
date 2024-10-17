import Loginpage from './pages/login/login-page.jsx'
import SignUp from './pages/signup/signUp.jsx'
import ConversationPage from './components/home-page.jsx'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './context/AuthContext.jsx';



const App = () => {
  const {authUser}= useAuthContext();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/app/login" element={authUser ? <Navigate to="/app/conversation" /> : <Loginpage />} />
        <Route path="/app/signup" element={authUser ? <Navigate to="/app/login" /> : <SignUp />} />
        <Route path="/app/conversation" element={<ConversationPage />} />
      </Routes>
    </BrowserRouter>
   
  );
}

export default App;