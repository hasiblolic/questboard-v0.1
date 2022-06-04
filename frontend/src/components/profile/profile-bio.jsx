import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { updateUserPhotoURL } from '../../features/user/user-slice';
import { Avatar, Button, Container, Grid, Paper, Stack, styled, Typography } from '@mui/material';
import ComputerIcon from '@mui/icons-material/ComputerOutlined';

export default function ProfileBio() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  // ----------------------------------------------------------------

  // ----------------------------------------------------------------
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 5, m: 1 }}>
          <Typography>Bio</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={8}>
        <Paper sx={{ p: 5, m: 1 }}>
          <Typography>Bio</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}
