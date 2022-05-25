import axios from 'axios';

const API_URL = 'http://localhost:8000/api/users';

const updateUserPhotoURL = async (userData) => {
  console.log('received request from slice');
  console.log('starting a patch request to server');
  const response = await axios.patch(API_URL + '/update-photo', {
    method: 'PATCH',
    body: userData,
    headers: { 'Content-type': 'application/json' }
  })
  console.log(response);

  // setting user data/token into local storage
  if(response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
}

// signup user
const signup = async (userData) => {
    // getting response from server (getting user's data - token)
    const response = await axios.post(API_URL + '/signup', userData);

    // setting user data/token into local storage
    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
}

const signupWithGoogle = async (userData) => {
  // getting response from server (getting user's data - token)
  const response = await axios.post(API_URL + '/signup-with-google', userData);

  // setting user data/token into local storage
  if(response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
}

// signin user
const signin = async (userData) => {
    // getting response from server (getting user's data - token)
    const response = await axios.post(API_URL + '/signin', userData);

    // setting user data/token into local storage
    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
}

// signin user
const signinWithGoogle = async (userData) => {
  // getting response from server (getting user's data - token)
  const response = await axios.post(API_URL + '/signin-with-google', userData);

  // setting user data/token into local storage
  if(response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
}


const signout = () => {
    localStorage.removeItem('user');
}

const authService = {
    signup,
    signupWithGoogle,
    signin,
    signinWithGoogle,
    signout,
    updateUserPhotoURL,
}

export default authService;