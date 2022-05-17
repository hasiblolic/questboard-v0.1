import axios from 'axios';

const API_URL = 'http://localhost:8000/api/fields/';

const config = (token) => {
  if(!token) return;

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }
}

// create field
const createField = async (fieldData, token) => {
  const response = await axios.post(API_URL, fieldData, config(token));
  return response.data;
}

// get all fields
const getFields = async (token) => {
  const response = await axios.get(API_URL, config(token));
  return response.data;
}

// update field based on id supplied along with field data
// (id of the field you want to update must be inside the fieldData!)
const updateField = async (fieldData, token) => {
  const response = await axios.put(API_URL, fieldData, config(token));
  return response.data;
}

// delete field based on id supplied
const deleteField = async (id, token) => {
  const response = await axios.put(API_URL, id, config(token));
  return response.data;
}


const fieldService = {
  createField,
  updateField,
  deleteField,
  getFields,
}

export default fieldService;