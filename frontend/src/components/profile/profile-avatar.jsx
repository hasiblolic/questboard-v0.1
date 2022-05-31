import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { updateUserPhotoURL } from '../../features/user/user-slice';
import { Avatar, Box, Button, Container, Grid, Paper, Stack, styled, Typography } from '@mui/material';
import ComputerIcon from '@mui/icons-material/ComputerOutlined';

export default function ProfileAvatar() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  // will contain whatever user selects to be uploaded
  const [imageUpload, setImageUpload] = useState(null);

  // this is the size of the avatar for easy adjustment
  const avatarSize = 240;

  // ----------------------------------------------------------------
  // this function will upload image to the database using dispatch action
  const uploadImage = () => {
    // if no image has been selected just return and pop an error
    if(!imageUpload) {
      toast.error('Please select an image to upload');
      return;
    }

    const body = { imageUpload, user }
    dispatch(updateUserPhotoURL(body));
  }

  // ----------------------------------------------------------------
  // will update the state with selected photo
  const handleUploadPhoto = (event) => {
    setImageUpload(event.target.files[0]);
  }

  // ----------------------------------------------------------------
  // styiling for the input button - file select button
  const Input = styled('input')({
    display: 'none',
  });

  // ----------------------------------------------------------------
  return (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {/* Display Large Avatar */}
            <Stack direction="column" alignItems="center" spacing={2} component='form' noValidate sx={{ mt: 3 }}>
              <Avatar 
                alt={user?.displayName}
                src={user?.photoURL}
                sx={{ width: avatarSize, height: avatarSize, fontSize: avatarSize/2 }}
              />

              {/* Buttons for uploading photos onto firebase */}
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
  );
}
