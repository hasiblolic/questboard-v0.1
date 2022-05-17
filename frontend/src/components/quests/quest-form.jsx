import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createQuest } from '../../features/quests/quest-slice';

function QuestForm(props) {
  const dispatch = useDispatch();

  const [questFormData, setQuestFormData] = useState({
    title: '',
    description: '',
    due: new Date().toISOString().split('T')[0],
  });

  // on change events for quest form
  const onChangeQuestForm = (e) => {
    setQuestFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
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
    <form onSubmit={onSubmit}>
      {/* FORM INPUT FOR QUEST TITLE */}
        <div className='mb-3'>
          <input
            type='text'
            className='form-control'
            name='title'
            placeholder='...'
            value={questFormData.title}
            onChange={onChangeQuestForm}
          />
        </div>
      {/* FORM INOUT FOR DESCRIPTION */}
        <div className='mb-3'>
          <input
            type='text'
            className='form-control'
            name='description'
            placeholder='...'
            value={questFormData.description}
            onChange={onChangeQuestForm}
          />
        </div>
      {/* FORM INPUT FOR DUE DATE */}
        <div className='mb-3'>
          <input
            type='date'
            className='form-control'
            name='due'
            value={questFormData.due}
            onChange={onChangeQuestForm}
          />
        </div>
      
        <button type='submit' className='btn btn-outline-success'>Submit New Quest</button>
            
      
    </form>
  )
}
  
export default QuestForm;