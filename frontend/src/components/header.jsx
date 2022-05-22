import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signout, reset } from '../features/auth/auth-slice';

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);


  const onSignout = () => {
    dispatch(signout());
    dispatch(reset());
    navigate('/signin');
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
                    <Link className='nav-link' onClick={onSignout} to='/signin'>
                      signout
                    </Link>
                </li>
              </> : <>
                {/* User not logged in so display signin and signup buttons  */}
                <li className='nav-item'>
                  <Link className='nav-link' to='/signin' >
                    Sign In
                  </Link>
                  </li>
                <li className='nav-item'>
                  <Link className='nav-link' to='/signup' >
                    Sign Up
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
