import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import QuestForm from '../components/quests/quest-form';
import Spinner from '../components/spinner';
import DisplayQuests from '../components/quests/display-quests';

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isError, message, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    // if no user is found - (no token) - go back to login because unauthorized
    if(!user) {
      navigate('/signin');
    }
    
    if (isError) {
      toast.error(message);
    }

  }, [user, navigate, isError, message, dispatch]);
    
  // if the page is loading, display the loading spinner
  if(isLoading === true) {
    return <Spinner />
  }

  // if no user present don't bother trying to render anything, useEffect will navigate to login
  if(!user) return;
  
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
  );
}
