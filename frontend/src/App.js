import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// react-toastify to display errors
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

// pages/component imports
import Dashboard from './pages/dashboard';
import Login from './pages/sign-in';
import Register from './pages/register';
import Profile from './pages/profile';
import Header from './components/header';

function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/profile' element={<Profile />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
