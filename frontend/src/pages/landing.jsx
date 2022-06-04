import { Box, Container, Grid, Paper, Typography } from "@mui/material";

export default function Landing() {
  return (
    <Container>
      <Box sx={{ mt: 5 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 5 }}>
              <Typography>show example of dashboard</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 5 }}>
              <Typography>show example of team</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 5 }}>
              <Typography>show example of projects</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 5 }}>
              <Typography>show example of calendar view</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}
