import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Spinner from '../components/spinner';
import { toast } from 'react-toastify';
import { Grid } from '@mui/material';
import ProfileTabs from '../components/profile/profile-tabs';

export default function Profile() {
  const navigate = useNavigate();

  // ----------------------------------------------------------------
  // getting auth state to find out if user is signed in or not
  const { userToken, isError, message, isLoading } = useSelector((state) => state.auth);

  // ----------------------------------------------------------------
  // useEffect to check for any errors and if a user is actually logged in before displaying anything
  useEffect(() => {
    if(isError) {
      return () => { toast.error(message); }
    }

    // no token found meaning user not signed in, navigate to signin page
    if(!userToken) {
      return () => { navigate('/signin'); }
    }

  }, [userToken, navigate, isError, message]);
    
  // if the page is loading, display the loading spinner
  if(isLoading === true) return <Spinner />

  // if no user is found, there is no reason to render anything
  if(!userToken) return;

  // ----------------------------------------------------------------
  return (
      <Grid container spacing={2} sx={{ mt: 1, p: 1 }}>
        <Grid item xs={12}>
          <ProfileTabs />
        </Grid>
      </Grid>
  );
}
