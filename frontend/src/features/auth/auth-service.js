import axios from 'axios';

const API_URL = 'http://localhost:8000/api/users';

// register user
const register = async (userData) => {
    // getting response from server (getting user's data - token)
    const response = await axios.post(API_URL + '/register', userData);

    // setting user data/token into local storage
    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data;
}

// login user
const login = async (userData) => {
    // getting response from server (getting user's data - token)
    const response = await axios.post(API_URL + '/login', userData);

    // setting user data/token into local storage
    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data;
}


const logout = () => {
    localStorage.removeItem('user');
}

const authService = {
    register,
    login,
    logout
}

export default authService;