import axios from "axios";

// Constants
const API_HOST = "http://localhost:4500";
const USER_KEY = "user";

// Functions for user CRUD

/** Function takes username and password, then forms API call,
 *  If server returns user object, setUser is called, if null is returned
 *  by server, the function will return null.
 *  #Reference: Week 8 tutorial code
 * @param  {"String"} username
 * @param  {"String"} password
 * @returns User or Null
 */
async function verifyUser(username, password) {
  const response = await axios.get(API_HOST + "/api/users/login", {
    params: { username, password },
  });
  const user = response.data;

  if (user !== null) setUser(user);

  return user;
}

/** Function takes username as parameter, then performs get
 *  request from API. If username is found, function will return user
 *  if no user is found function will return null.
 * @param  {"String"} username
 * @returns user or null
 */
async function findUser(username) {
  const response = await axios.get(API_HOST + `/api/users/select/${username}`);

  const user = response.data;

  return user;
}

/** Function takes user object as parameter, then
 *  preforms post to the API endpoint
 * @param  {Object} user
 * @returns response data
 */
async function createUser(user) {
  const response = await axios.post(API_HOST + "/api/users", user);

  return response.data;
}
/** Function takes user object sends a request to
 *  the API endpoint, the returns the response from
 *  the server.
 * @param  {Object} user
 * @returns JSON user object
 */
async function updateUser(user) {
  const response = await axios.put(API_HOST + "/api/users/update", user);

  return response.data;
}

// Functions for post CRUD operations

async function createPost(post) {
  const response = await axios.post(API_HOST + "/api/posts", post);

  return response.data;
}

async function uploadImage(image) {
  const response = await axios.post(API_HOST + "/api/posts/upload-image", image);

  return response.data;
}

async function getAllPrimaryPosts() {
  const response = await axios.get(API_HOST + "/api/posts");

  return response.data;
}

async function getAllReplies() {
  const response = await axios.get(API_HOST + "/api/posts/replies");

  return response.data;
}

async function getPostById(id){
  const response = await axios.post(API_HOST + `/api/posts/getbyid/${id}`);

  return response.data;
}

async function updatePost(updatePost){
  const response = await axios.put(API_HOST + "/api/posts/update", updatePost);

  return response.data;
}

// Helper functions for saving user in local storage

/** Function takes user object as parameter,
 *  then creates JSON object and stores it in
 *  local storage under USER_KEY constant
 * @param  {} user
 */
const setUser = (user) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

/** Function gets JSON user object from local storage
 *  and returns user string object
 * @returns Object user
 */
const getUser = () => {
  return JSON.parse(localStorage.getItem(USER_KEY));
};

/** Function removes the JSON user object from
 *  local storage
 */
const removeUser = () => {
  localStorage.removeItem(USER_KEY);
};

export {
  verifyUser,
  findUser,
  createUser,
  getUser,
  removeUser,
  updateUser,
  createPost,
  getAllPrimaryPosts,
  uploadImage,
  getAllReplies,
  getPostById,
  updatePost,
};
