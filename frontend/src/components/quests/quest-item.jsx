import { useState } from 'react';
import { useDispatch } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckMarkOutline from '@mui/icons-material/CheckCircleOutline';
import CheckMark from '@mui/icons-material/CheckCircle';
import Checkbox from '@mui/material/Checkbox';

import { deleteQuest, updateQuest } from '../../features/quests/quest-slice';
import { TableCell, TableRow, Typography } from '@mui/material';

export default function QuestItem(props) {
  const dispatch = useDispatch();

  const [questState, setQuestState] = useState(props.quest);

  // handle change function - whenever something is changed in the input fields, this gets reflected onto the state (questState)
  const handleChange = (event) => {
    setQuestState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.name === 'completion' ? event.target.checked : event.target.value,
    }));
  }

  // whenever user leaves the input, dispatch an update
  const handleBlur = (event) => {
    dispatch(updateQuest(questState));
  }

  // sends a dispatch to delete quest
  const handleDelete = () => {
    dispatch(deleteQuest(questState._id));
  }

  return (
    <TableRow
      key={questState._id}
      hover
    >
      <TableCell>
        <Checkbox
          icon={<CheckMarkOutline />}
          checkedIcon={<CheckMark />}
          name='completion'
          checked={questState.completion}
          onChange={handleChange}
        />
      </TableCell>
      <TableCell>
        <Typography variant='body1'>
          {questState.title}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant='body1'>
          {new Date(questState.due).toISOString().split('T')[0]}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant='body1'>
          {questState.description}
        </Typography>
      </TableCell>
      <TableCell>
        <IconButton aria-label='delete' onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}