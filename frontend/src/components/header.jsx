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
    navigate('/login');
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
                      Profile
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link className='nav-link' onClick={onLogout} to='/login'>
                      Logout
                    </Link>
                </li>
              </> : <>
                {/* User not logged in so display login and register buttons  */}
                <li className='nav-item'>
                  <Link className='nav-link' to='/login' >
                    Login
                  </Link>
                  </li>
                <li className='nav-item'>
                  <Link className='nav-link' to='/register' >
                    Register
                  </Link>
                </li>
              </>
            }
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Header