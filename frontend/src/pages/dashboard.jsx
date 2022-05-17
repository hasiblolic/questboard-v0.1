import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { reset } from '../features/quests/quest-slice';

// this form lets you create a new quest
import QuestForm from '../components/quests/quest-form';
import Spinner from '../components/spinner';
import DisplayQuests from '../components/quests/display-quests';

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isError, message, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    if(isError) {
      // console log the error message we receive and reset state on unmount
      console.log(message);
      return () => { dispatch(reset()) }
    }
   
    // if no user is found - (no token) - go back to login because unauthorized
    if(!user) {
      navigate('/login');
      return () => {
        // after navigating to /login and component unmounts we will reset the state
        dispatch(reset());
      }
    }

    // cleanup function - component unmounts and resets the state
    return () => {
      dispatch(reset());
    };

  }, [user, navigate, isError, message, dispatch]);
    
  // if the page is loading, display the loading spinner
  if(isLoading === true) return <Spinner />

  return (
    <>
      <section className='text-center'>
        <h1>Welcome {user && user.name}</h1>
        <p>Create some quests!</p>
      </section>

      <QuestForm />

      <hr/>

      <section className='content'>
        <h3>Quests</h3>
        <DisplayQuests />
      </section>
    </>
  )
}

export default Dashboard;