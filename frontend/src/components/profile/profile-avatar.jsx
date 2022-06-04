import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { updateUserPhotoURL } from '../../features/user/user-slice';
import { Avatar, Button, Container, Grid, Stack, styled, Typography } from '@mui/material';
import ComputerIcon from '@mui/icons-material/ComputerOutlined';

export default function ProfileAvatar() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  // ----------------------------------------------------------------
  // this function will upload image to the database using dispatch action
  const uploadImage = (event) => {
    const image = event.target.files[0];
    // if no image has been selected just return and pop an error
    if(!image) {
      toast.error('Please select an image to upload');
      return;
    }

    const body = { image, user };
    dispatch(updateUserPhotoURL(body));
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
              <Typography variant='h5'>Profile</Typography>
                <Avatar
                  alt={user?.displayName}
                  src={user?.photoURL}
                  sx={{ width: '55%', height: '55%', fontSize: '55%', aspectRatio: '1/1' }}
                />

              {/* Buttons for uploading photos onto firebase */}
              <Input
                accept="image/*"
                id="contained-button-file"
                multiple
                type="file"
                onChange={uploadImage}
              />
              <label htmlFor="contained-button-file">
                <Button component='span' variant='outlined' sx={{ textTransform: 'none' }} startIcon={<ComputerIcon />}>
                  <Typography noWrap sx={{ paddingLeft: 2}}>Upload photo from computer</Typography>
                </Button>
              </label>
            </Stack>
          </Grid>
        </Grid>
  );
}
