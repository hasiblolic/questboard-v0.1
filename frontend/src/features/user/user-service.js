import axios from 'axios';
import { storage } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const API_URL = 'http://localhost:8000/api/users';

const userToken = JSON.parse(localStorage.getItem('user'));

const headerConfig = {
  headers: {
    Authorization: `Bearer ${userToken}`
  }
}

const getUserProfile = async () => {
  const response = await axios.get(`${API_URL}/profile`, headerConfig);

  return response.data;
};

const updateUserPhotoURL = async (body) => {
  const { image, user } = body;

  // if no image has been selected, return
  if(image === null || image === undefined) throw new Error('No image selected');
  if(user === null || user === undefined) throw new Error('User not found');

  // reference to a spot in the firebase storage
  const imageRef = ref(storage, `images/${user._id}`, headerConfig);

  // upload to firebase and get back the image url
  const snapshot = await uploadBytes(imageRef, image);
  const photoURL = await getDownloadURL(snapshot.ref);

  const data = {
    photoURL: photoURL.toString()
  }

  const response = await axios.put(`${API_URL}/profile/photo/${user._id}`, data, headerConfig);

  return response.data;
};

const userService = {
  getUserProfile,
  updateUserPhotoURL,
}

export default userService;