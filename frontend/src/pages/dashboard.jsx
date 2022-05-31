import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getQuests } from '../features/quests/quest-slice';
import QuestForm from '../components/quests/quest-form';
import Spinner from '../components/spinner';
import QuestTable from '../components/quests/quest-table';
import { Box, Container, Typography } from '@mui/material';

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const questState = useSelector((state) => state.quests);

  useEffect(() => {
    if(questState.isError) toast.error(questState.message);

    if(questState.quests.length === 0) return () => { dispatch(getQuests()); }
  }, [questState.quests, questState.isError, questState.message, dispatch, navigate]);

  // if the page is loading, display the loading spinner
  if(questState.isLoading === true) return <Spinner />

  return (
    <Container component='main'>
      <QuestForm />

      <Box>
        <Typography variant='h6' sx={{ textAlign: 'center' }}>Quests</Typography>
        {questState.quests.length > 0
        ? (<QuestTable data={questState.quests} />)
        : (<Typography variant='h5'>There are currently no quests to display</Typography>)}
      </Box>
    </Container>
  );
}
