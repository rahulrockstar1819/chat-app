import Loginpage from './pages/login/login-page.jsx'
import SignUp from './pages/signup/signUp.jsx'
import Home from './pages/home/Home-page.jsx'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './context/AuthContext.jsx';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';



const theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        bg: "",
      },
    }),
  },
});

const App = () => {
  const {authUser}= useAuthContext();
  return (
    <BrowserRouter>
    <ChakraProvider theme={theme}>
      <Routes>
        <Route path="/app/login" element={authUser ? <Navigate to="/app/home" /> : <Loginpage />} />
        <Route path="/app/signup" element={authUser ? <Navigate to="/app/login" /> : <SignUp />} />
        <Route path="/app/home" element={authUser ? <Home /> : <Navigate to="/app/login" />} />
      </Routes>
      </ChakraProvider>
    </BrowserRouter>
   
  );
}

export default App;
