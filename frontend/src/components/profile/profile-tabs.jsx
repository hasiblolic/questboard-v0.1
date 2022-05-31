import { Box, Container, Grid, Paper, Tab, Tabs, Typography } from '@mui/material';
import React, { useState } from 'react'
import ProfileAvatar from './profile-avatar';

// ----------------------------------------------------------------
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role='tabpanel'
      hidden={value !== index}
      id={`vertical-tablpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Paper sx={{ p:3 }}>
          {children}
        </Paper>
      )}
    </Box>
  );
}

// ----------------------------------------------------------------
function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}


export default function ProfileTabs(props) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // ----------------------------------------------------------------
  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'Background.paper', display: 'flex', ml: 5 }}
    >
      <Tabs
        orientation='vertical'
        variant='scrollable'
        value={value}
        onChange={handleChange}
        aria-label='vertical profile tabs'
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab label='Avatar' {...a11yProps(0)} />
        <Tab label='Bio' {...a11yProps(1)} />
      </Tabs>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TabPanel value={value} index={0}>
              <ProfileAvatar />
            </TabPanel>
            <TabPanel value={value} index={1}>
              Item Two
            </TabPanel>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
