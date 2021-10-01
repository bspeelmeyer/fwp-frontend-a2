import axios from "axios";

// Constants
const API_HOST = "http://localhost:4500";
const USER_KEY = "user";

// User
async function verifyUser(username, password) {
  const response = await axios.get(API_HOST + "/api/users/login", {
    params: { username, password }
  });
  const user = response.data;

  if (user !== null) setUser(user);

  return user;
}

async function findUser(username) {
  const response = await axios.get(API_HOST + `/api/users/select/${username}`);

  const user = response.data;

  return user;
}

async function createUser(user) {
  const response = await axios.post(API_HOST + "/api/users", user);

  return response.data;
}

// Function for interaction with local storage
const setUser = (user) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

const getUser = () => {
  return JSON.parse(localStorage.getItem(USER_KEY));
};

const removeUser = () => {
  localStorage.removeItem(USER_KEY);
};

export { verifyUser, findUser, createUser, getUser, removeUser };
