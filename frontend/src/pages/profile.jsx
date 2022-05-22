import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// this form lets you create a new quest
import Spinner from '../components/spinner';

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isError, message, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
   
    // if no user is found - (no token) - go back to login because unauthorized
    if(!user) {
      navigate('/signin');
    }

  }, [user, navigate]);
    
  // if the page is loading, display the loading spinner
  if(isLoading === true) return <Spinner />

  if(!user) return;
  
  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='col-md'>
            <h4>Woah Dude!</h4>
          </div>
          <div className='col-md'>
            <h4>Awesome</h4>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile;