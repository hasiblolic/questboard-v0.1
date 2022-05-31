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
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Landing from './pages/landing';
import SignOut from './pages/sign-out';
import { getUserProfile } from './features/user/user-slice';

function App() {
  const dispatch = useDispatch();
  const { userToken, isError, message } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (isError) {
      return () => { toast.error(message); }
    }
    
    if(!user) {
      return () => { dispatch(getUserProfile()); }
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
          {userToken && (<Route path='/dashboard' element={<Dashboard />} />) }
          {userToken && (<Route path='/profile' element={<Profile />} />) }
        </Routes>
      </Router>
      <ToastContainer />
    </Box>
  );
}

export default App;
