import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

import Dashboard from './pages/dashboard';
import Signin from './pages/sign-in';
import Signup from './pages/sign-up';
import Profile from './pages/profile';
import AppBar from './components/app-bar/app-bar';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import Landing from './pages/landing';
import SignOut from './pages/sign-out';

function App() {
  const { isError, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

  }, [isError, message]);

  return (
    <Box>
      <Router>
        <AppBar />
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/signout' element={<SignOut />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </Router>
      <ToastContainer />
    </Box>
  );
}

export default App;
