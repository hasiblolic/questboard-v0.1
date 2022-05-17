import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { deleteQuest, getQuests, reset, updateQuest } from '../../features/quests/quest-slice';
import Spinner from '../spinner';

import QuestItem from './quest-item';

function DisplayQuests() {
  const dispatch = useDispatch();
  const { quests, isLoading, isError, message } = useSelector((state) => state.quests);

  useEffect(() => {
    if(isError) {
      console.log(message);
      return () => { dispatch(reset()) }
    }

    // dispatching action to fetch all the quests
    dispatch(getQuests());

    // resetting the state once the component gets unmounted
    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError, message])

  if(isLoading === true) return <Spinner />

  return (
    <table className='table'>
      <thead>
        <tr>
          <th>Complete</th>
          <th>Title</th>
          <th>Due Date</th>
          <th>Description</th>
          <th>Edit/Delete</th>
        </tr>
      </thead>
      <tbody>
        {
          quests.length > 0 
          ? quests.map((quest) => <QuestItem key={quest._id} quest={quest} />)
          : <tr><td>There are no quests</td></tr>
        }
      </tbody>
    </table>
  )
}
  
export default DisplayQuests;