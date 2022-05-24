import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import QuestForm from '../components/quests/quest-form';
import DisplayQuests from '../components/quests/display-quests';
import { toast } from 'react-toastify';
import Spinner from '../components/spinner';

export default function Dashboard() {
  const navigate = useNavigate();

  const { user, isLoading, isError, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if(isError) {
      toast.error(message);
    }
   
    // if no user is found - (no token) - go back to signin because unauthorized
    if(!user) {
      navigate('/signin');
    }

  }, [user, isError, message, navigate]);

  // if the page is loading, display the loading spinner
  if(isLoading === true) return <Spinner />

  // if no user is found, there is no reason to render anything
  if(!user) return;

  return (
    <>
      <section className='text-center'>
        <p>Create some quests!</p>
      </section>

      <QuestForm />

      <hr/>

      <section className='content'>
        <h3>Quests</h3>
        <DisplayQuests />
      </section>
    </>
  );
}
