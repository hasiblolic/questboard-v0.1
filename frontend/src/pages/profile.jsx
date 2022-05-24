import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { v4 } from 'uuid'

import Spinner from '../components/spinner';
import { toast } from 'react-toastify';
import { styled } from '@mui/material/styles'
import { Box, Typography, Container, Grid, Stack, Button, IconButton, Fab } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera'
import Photo from '@mui/icons-material/Photo'
import { updateUserPhotoURL } from '../features/auth/auth-slice';

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isError, message, isLoading } = useSelector((state) => state.auth);
  const [imageUpload, setImageUpload] = useState(null);

  useEffect(() => {
    if(isError) {
      toast.error(message);
    }
   
    // if no user is found - (no token) - go back to signin because unauthorized
    if(!user) {
      navigate('/signin');
    }

  }, [user, isError, message, navigate]);
    
  // if the page is loading, display the loading spinner
  if(isLoading === true) return <Spinner />

  // if no user is found, there is no reason to render anything
  if(!user) return;

  const uploadImage = () => {
    // if no image has been selected, return
    if(imageUpload === null || imageUpload === undefined) return;
    console.log(imageUpload);

    // reference to a spot in the firebase storage
    const imageRef = ref(storage, `images/${user.displayName}/${imageUpload.name + v4()}`);

    // upload to firebase and get back the image url
    // dispatching an action to update user's photoURL in database
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        dispatch(updateUserPhotoURL({
          ...user,
          photoURL: url,
        }));
      })
    });

    console.log('dispatched action');
  }

  const handleUploadPhoto = (event) => {
    console.log('setting image');
    console.log(event.target.files[0]);
    setImageUpload(event.target.files[0]);
  }

  const Input = styled('input')({
    display: 'none',
  });

  function UploadButtons() {
    return (
      <Stack direction="row" alignItems="center" spacing={2}>
          <Button variant="extended">
            <Input accept="image/*" id="contained-button-file" type="file" onClick={handleUploadPhoto} />
            <Photo sx={{ mr: 1 }} />
            Choose Photo
          </Button>
        <Button variant="contained" component="span" onClick={uploadImage}>
            Upload
        </Button>
      </Stack>
    )
  }
  
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        >
          <Typography variant='h4'>Profile</Typography>
          <Box component="form" noValidate  sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                {/* Buttons for uploading photos onto firebase */}
                <UploadButtons />
              </Grid>
            </Grid>
          </Box>
          
          <Typography>Awesome!</Typography>
      </Box>
    </Container>
  )
}

export default Profile;