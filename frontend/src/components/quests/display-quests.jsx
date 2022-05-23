import { Typography } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getQuests } from '../../features/quests/quest-slice';
import Spinner from '../spinner';
import QuestTable from './quest-table';

export default function DisplayQuests() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { quests, isLoading, isError, message } = useSelector((state) => state.quests);

  useEffect(() => {
    if(isError) {
      toast.error(message);
    }

    return () => dispatch(getQuests());
  }, [dispatch, isError, message, navigate])

  if(isLoading === true) return <Spinner />

  if(quests.length > 0) {
    return (
      <QuestTable data={quests} />
    )
  } else {
    return (
      <Typography variant='h5'>There are currently no quests to display</Typography>
    )
  }
}