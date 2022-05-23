import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../features/auth/auth-slice';

import QuestForm from '../components/quests/quest-form';
import DisplayQuests from '../components/quests/display-quests';
import { toast } from 'react-toastify';

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isError, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if(isError) {
      toast.error(message);
    }

    if(!user) {
      navigate('/signin');
    }
  }, [user, isError, navigate, message]);

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
