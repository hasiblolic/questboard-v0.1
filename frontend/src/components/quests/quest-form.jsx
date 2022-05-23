import { Box, Button, Grid, Stack, TextField } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createQuest } from '../../features/quests/quest-slice';

export default function QuestForm(props) {
  const dispatch = useDispatch();

  const [questFormData, setQuestFormData] = useState({
    title: '',
    description: '',
    due: new Date().toISOString().split('T')[0],
  });

  // on change events for quest form
  const handleChange = (e) => {
    setQuestFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatching action to create a new quest, which will add onto database and reset the state
    dispatch(createQuest({
      title: questFormData.title,
      description: questFormData.description,
      due: questFormData.due,
      completion: false,
    }));
  };

  return (
    <Box
      component='form'
      onSubmit={handleSubmit}
      noValidate
      autoComplete='off'
    >
      <Stack direction='row' spacing={2} justifyContent='space-evenly'>
        {/* FORM INPUT FOR QUEST TITLE */}
        <TextField
          name='title'
          label='Title'
          fullWidth
          value={questFormData.title}
          onChange={handleChange}
        />
        {/* FORM INOUT FOR DESCRIPTION */}
        <TextField
          name='description'
          label='Description'
          fullWidth
          value={questFormData.description}
          onChange={handleChange}
        />
        {/* FORM INPUT FOR DUE DATE */}
        <TextField 
          name='due'
          type='date'
          label='Due Date'
          fullWidth
          value={new Date(questFormData.due).toISOString().split('T')[0]}
          onChange={handleChange}
        />
      </Stack>
      <Stack sx={{ marginTop: 2, marginBottom: 2 }} direction='column' spacing={2} justifyContent='space-evenly'>
        <Button variant='outlined' type='submit'>Submit New Quest</Button>
      </Stack>
      
    </Box>
  )
}
