import { Box, Container, Grid } from '@mui/material';
import ProfileAvatar from './profile-avatar';


export default function ProfileTabs(props) {

  // ----------------------------------------------------------------
  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'Background.paper', display: 'flex' }}
    >
      <Container maxWidth='xs'>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ProfileAvatar />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
