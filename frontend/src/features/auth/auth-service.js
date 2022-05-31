import axios from 'axios';

const API_URL = 'http://localhost:8000/api/users';

// signup or signin user based on enpoint - i.e. /signin... /signin-with-google
const authUser = async (userData) => {
  // getting response from server (getting user's data - token)
  const response = await axios.post(`${API_URL}/${userData.endPoint}`, userData.user);

  // setting user data/token into local storage
  if(response.data) {
    localStorage.setItem('user', JSON.stringify(response.data.token));
  }

  return response.data.token;
}


const signout = () => {
  localStorage.removeItem('user');
}

const authService = {
  authUser,
  signout,
}

export default authService;
