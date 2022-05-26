import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';

import Spinner from '../components/spinner';
import { toast } from 'react-toastify';
import { styled } from '@mui/material/styles';
import { Box, Typography, Container, Grid, Stack, Button, Avatar } from '@mui/material';
import ComputerIcon from '@mui/icons-material/Computer';
import CameraIcon from '@mui/icons-material/CameraAltOutlined'
import { updateUserPhotoURL } from '../features/auth/auth-slice';

export default function Profile() {
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

  }, [user, dispatch, isError, message, navigate]);
    
  // if the page is loading, display the loading spinner
  if(isLoading === true) return <Spinner />

  // if no user is found, there is no reason to render anything
  if(!user) return;

  const uploadImage = () => {
    // if no image has been selected, return
    if(imageUpload === null || imageUpload === undefined) return;

    // reference to a spot in the firebase storage
    const imageRef = ref(storage, `images/${user._id}`);

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
  }

  // will update the state with selected photo
  const handleUploadPhoto = (event) => {
    setImageUpload(event.target.files[0]);
  }

  // styiling for the input button - file select button
  const Input = styled('input')({
    display: 'none',
  });
  
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

          {/* Display Large Avatar */}
          <Box>
            <Avatar 
              alt={user?.displayName}
              src={user?.photoURL}
              sx={{ width: 240, height: 240 }}
            />
          </Box>

          {/* Buttons for uploading photos onto firebase */}
          <Box component="form" noValidate  sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <Stack direction="column" alignItems="center" spacing={2}>
                  <Input
                    accept="image/*"
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={handleUploadPhoto}
                  />
                  <label htmlFor="contained-button-file">
                    <Button component='span' variant='outlined' sx={{ textTransform: 'none' }} startIcon={<ComputerIcon />}>
                      <Typography sx={{ paddingLeft: 2}}>Upload from computer</Typography>
                    </Button>
                  </label>

                  <Button variant='contained' onClick={uploadImage}>Save Changes</Button>
                </Stack>
              </Grid>
            </Grid>
          </Box>
      </Box>
    </Container>
  )
}
