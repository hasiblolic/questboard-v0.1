import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/auth-slice';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);


  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  }

  return (
    <nav className='navbar navbar-expand-lg'>
      <div className='container-fluid'>
        <Link className='navbar-brand' to='/'>Questboard</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            {
              // If user is logged in, display appropriate buttons
              user ? <>
                <li className='nav-item'>
                    <Link className='nav-link' to='/profile'>
                      <FaUser /> Profile
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link className='nav-link' to='/login'>
                      <FaSignOutAlt /> Logout
                    </Link>
                </li>
              </> : <>
                {/* User not logged in so display login and register buttons  */}
                <li className='nav-item'>
                  <Link className='nav-link' to='/login' >
                    <FaSignInAlt /> Login
                  </Link>
                  </li>
                <li className='nav-item'>
                  <Link className='nav-link' to='/register' >
                    <FaUser /> Register
                  </Link>
                </li>
              </>
            }
          </ul>
        </div>
        { user ? 
        // user logged in so show logout button as well as profile
        (
          <ul className='navbar-nav'>
            
          </ul>
        ) : //else show login/register
        (
          <ul className='navbar-nav'>
            
          </ul>
        )}
      </div>
    </nav>
  )
}

export default Header