import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { signout } from '../features/auth/auth-slice';

function SignOut() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(signout());
    return () => {
      navigate('/signin');
    }
  }, [dispatch, navigate]);

  return (
    <div></div>
  )
}

export default SignOut