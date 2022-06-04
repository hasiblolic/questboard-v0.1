import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getQuests } from '../features/quests/quest-slice';
import QuestForm from '../components/quests/quest-form';
import Spinner from '../components/spinner';
import QuestTable from '../components/quests/quest-table';
import { Box, Container, Typography } from '@mui/material';

export default function Dashboard() {
  const dispatch = useDispatch();
  const { isError, isLoading, message, quests } = useSelector((state) => state.quests);

  useEffect(() => {
    if(isError) toast.error(message);

    if(quests.length === 0) return () => { dispatch(getQuests()); }
  }, [isError, message]);

  // if the page is loading, display the loading spinner
  if(isLoading === true) return <Spinner />;

  return (
    <Container component='main'>
      <QuestForm />

      <Box>
        <Typography variant='h6' sx={{ textAlign: 'center' }}>Quests</Typography>
        {quests.length > 0
        ? (<QuestTable data={quests} />)
        : (<Typography variant='h5'>There are currently no quests to display</Typography>)}
      </Box>
    </Container>
  );
}
