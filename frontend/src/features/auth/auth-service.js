import axios from 'axios';

const API_URL = 'http://localhost:8000/api/users';

// signup user
const signup = async (userData) => {
    // getting response from server (getting user's data - token)
    const response = await axios.post(API_URL + '/signup', userData);

    // setting user data/token into local storage
    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data;
}

// signin user
const signin = async (userData) => {
    // getting response from server (getting user's data - token)
    const response = await axios.post(API_URL + '/signin', userData);

    // setting user data/token into local storage
    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data;
}


const signout = () => {
    localStorage.removeItem('user');
}

const authService = {
    signup,
    signin,
    signout
}

export default authService;