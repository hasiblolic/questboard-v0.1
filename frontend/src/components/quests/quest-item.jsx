import { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useDispatch } from 'react-redux';

import { deleteQuest, getQuests, reset, updateQuest } from '../../features/quests/quest-slice';

function QuestItem(props) {
  const dispatch = useDispatch();

  const [questState, setQuestState] = useState({
    ...props.quest,
    due: new Date(props.quest.due).toISOString().split('T')[0],
  });

  const handleChange = (e) => {
    setQuestState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleCompletion = (e) => {
    setQuestState((prevState) => ({
      ...prevState,
      completion: !prevState.completion,
    }))
  }

  const handleDelete = () => {
    dispatch(deleteQuest(questState._id));
  }

  const confirmChange = () => {
    dispatch(updateQuest(questState));
  }

  return (
    <tr>
      <td>
        <input 
          type='checkbox'
          className='form-check-input'
          name='completion'
          value={questState.completion}
          checked={questState.completion}
          onChange={handleCompletion}
        />
      </td>
      <td>
        <input 
          type='text'
          className='form-control'
          name='title'
          value={questState.title}
          onChange={handleChange}
        />
      </td>
      <td>
        <input 
          type='date'
          className='form-control'
          name='due'
          value={questState.due}
          onChange={handleChange}
        />
      </td>
      <td>
        <input 
          type='text' 
          className='form-control'
          name='description'
          value={questState.description}
          onChange={handleChange}
        />
      </td>
      <td>
        <button className='btn btn-outline' onClick={confirmChange}><FaEdit/></button>
        <button className='btn btn-outline' onClick={handleDelete}><FaTrash /></button>
      </td>
    </tr>
  )
}
  
export default QuestItem;