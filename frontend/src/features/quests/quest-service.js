import axios from 'axios';

const API_URL = 'http://localhost:8000/api/quests/';

const config = (token) => {
  if(!token) return;

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }
}

// create quest
const createQuest = async (questData, token) => {
  const response = await axios.post(API_URL, questData, config(token));
  return response.data;
}

// get all quests
const getQuests = async (token) => {
  const response = await axios.get(API_URL, config(token));
  return response.data;
}

// update quest based on id supplied along with quest data
// (id of the quest you want to update must be inside the questData!)
const updateQuest = async (updatedQuest, token) => {
  const response = await axios.put(API_URL + updatedQuest._id, updatedQuest, config(token));
  return response.data;
}

// delete quest based on id supplied
const deleteQuest = async (id, token) => {
  const response = await axios.delete(API_URL + id, config(token));
  return response.data;
}


const questService = {
  createQuest,
  updateQuest,
  deleteQuest,
  getQuests,
}

export default questService;