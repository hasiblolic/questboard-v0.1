import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

import Dashboard from './pages/dashboard';
import Signin from './pages/sign-in';
import Signup from './pages/sign-up';
import Profile from './pages/profile';
import Header from './components/header';
import { Container } from '@mui/material';

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <Container>
      <Router>
        <Header />
        {!user || (<Signin />)}
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </Router>
      <ToastContainer />
    </Container>
  );
}

export default App;
