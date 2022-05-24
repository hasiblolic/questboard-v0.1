import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signout } from '../features/auth/auth-slice';

function SignOut() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isError, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if(isError) {
      toast.error(message);
    }
   
    // if no user is found - (no token) - go back to signin because unauthorized
    if(!user) {
      navigate('/signin');
    }

    dispatch(signout());

  }, [dispatch, user, isError, message, navigate]);

  return (
    <div></div>
  )
}

export default SignOut