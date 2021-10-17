import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import {
  getAllPrimaryPosts,
  getAllReplies,
  deletePost,
  likePost,
  dislikePost,
  getLikedPosts,
  getDislikedPosts,
} from "../data/repository";
import { SpinningCircles } from "react-loading-icons";
import Follow from "./Follow";

const Posts = (props) => {
  const history = useHistory();
  // Is loading method from week 8 tutorial
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [replies, setReplies] = useState([]);
  const [dislikedPosts, setDislikedPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [value, setValue] = useState(0);
  const [deleteAlert, setDeleteAlert] = useState(false);

  // Method credit week 8 tutorial
  useEffect(() => {
    // Create object to be parsed to
    // database
    const user = {
      user_name: props.user.user_name,
    };

    // Function populates primary posts, reply
    // posts, liked and disliked arrays
    async function loadPosts() {
      const currentPosts = await getAllPrimaryPosts(user);
      const currentReplies = await getAllReplies();
      const likedPosts = await getLikedPosts(user);
      const dislikedPosts = await getDislikedPosts(user);

      // Set array states
      setPosts(currentPosts);
      setReplies(currentReplies);
      setLikedPosts(likedPosts);
      setDislikedPosts(dislikedPosts);

      setIsLoading(false);
    }

    loadPosts();
  }, [props.user.user_name, value]);

  // Check user is logged in,
  // if not redirect
  if (props.user == null) {
    history.push("/signin");
    return null;
  }

  // Handle delete button click
  const handleDelete = (post_id) => {
    // Create object to be parsed
    // to the database
    const post = {
      post_id: post_id,
    };

    // Function to make API call
    // to delete post from database
    async function removePost() {
      await deletePost(post);
    }
    removePost();

    // Show alert for 2 seconds
    setDeleteAlert(true);
    setTimeout(function () {
      setDeleteAlert(false);
    }, 2000);

    // Force rerender of component
    setValue(value + 1);
  };

  // Handle like button click
  const handleLike = (post_id) => {
    // Create object to parse to
    // database
    const post = {
      post_id: post_id,
      user_name: props.user.user_name,
    };

    // Function to make API call
    // to create like post relationship
    // in the database
    async function like() {
      await likePost(post);
    }
    like();

    // Time delay to allow database
    // to update before rerender
    setTimeout(function () {
      setValue(value + 1);
    }, 500);
  };

  // Inverse of handle like function
  const handleDislike = (post_id) => {
    const post = {
      post_id: post_id,
      user_name: props.user.user_name,
    };
    async function dislike() {
      await dislikePost(post);
    }
    dislike();
    setTimeout(function () {
      setValue(value + 1);
    }, 500);
  };

  // Function checks if user has
  // disliked post
  const dislikeExists = (post_id) => {
    return dislikedPosts.some(function (ele) {
      return ele.post === post_id;
    });
  };

  // Function check if user has liked
  // post
  const likeExists = (post_id) => {
    return likedPosts.some(function (el) {
      return el.post === post_id;
    });
  };

  return (
    <div className="container py-1">
      <div className="row">
        <div className="col-3"></div>
        <div className="col-6">
          <div className="row bg-dark text-white rounded-3">
            <h2 className="text-center">Posts</h2>
          </div>
          <div className="row py-1">
            <Link to="/create-post">
              <button className="btn btn-dark w-100">Create Post</button>
            </Link>
          </div>
          <div className="row">
            {deleteAlert ? (
              <div className="alert alert-success shadow-lg" role="alert">
                <p>Successfully deleted post</p>
              </div>
            ) : null}
          </div>
          <div className="row">
            {isLoading ? (
              <div>
                <SpinningCircles />
              </div>
            ) : posts.length === 0 ? (
              <span className="text-muted">No post have been submitted.</span>
            ) : (
              posts.map((x) => (
                <div className="container py-2">
                  <div className="card shadow-lg">
                    <h5 className="card-header bg-dark text-white">
                      {x.user_name}
                    </h5>
                    <div className="card-body">
                      <p>{x.post_content}</p>
                    </div>
                    {x.image === null ? null : (
                      <img
                        className="card-img-mid"
                        src={`http://localhost:4500/static/${x.image}`}
                        alt="Post_image"
                      />
                    )}
                    <div className="card-footer bg-dark">
                      <div className="row border-bottom border-white">
                        {likeExists(x.post_id) ? (
                          <div
                            onClick={() => handleLike(x.post_id)}
                            className="col-1 px-1"
                          >
                            <h3>
                              <i className="bi bi-hand-thumbs-up-fill text-white"></i>
                            </h3>
                          </div>
                        ) : (
                          <div
                            onClick={() => handleLike(x.post_id)}
                            className="col-1 px-1"
                          >
                            <h3>
                              <i className="bi bi-hand-thumbs-up text-white"></i>
                            </h3>
                          </div>
                        )}

                        <div className="col-1 px-1">
                          <h3 className="text-white">{x.likes}</h3>
                        </div>

                        {dislikeExists(x.post_id) ? (
                          <div
                            onClick={() => handleDislike(x.post_id)}
                            className="col-1 px-1"
                          >
                            <h3>
                              <i className="bi bi-hand-thumbs-down-fill text-white"></i>
                            </h3>
                          </div>
                        ) : (
                          <div
                            onClick={() => handleDislike(x.post_id)}
                            className="col-1 px-1"
                          >
                            <h3>
                              <i className="bi bi-hand-thumbs-down text-white"></i>
                            </h3>
                          </div>
                        )}

                        <div className="col-1 px-1">
                          <h3 className="text-white">{x.dislikes}</h3>
                        </div>
                        <div className="col-5"></div>
                        <div className="col-1 px-1">
                          {props.user.user_name === x.user_name ? (
                            <Link to={`/edit-post/${x.post_id}`}>
                              <h3>
                                <i className="bi bi-pencil-square text-white"></i>
                              </h3>
                            </Link>
                          ) : null}
                        </div>
                        <div className="col-1 px-1">
                          {props.user.user_name === x.user_name ? (
                            <div onClick={() => handleDelete(x.post_id)}>
                              <h3>
                                <i className="bi bi-trash text-danger"></i>
                              </h3>
                            </div>
                          ) : null}
                        </div>
                        <div className="col-1 px-1">
                          <Link to={`/create-reply/${x.post_id}`}>
                            <h3>
                              <i className="bi bi-reply text-white"></i>
                            </h3>
                          </Link>
                        </div>
                      </div>
                      {replies.length !== 0
                        ? replies.map((y) => (
                            <div>
                              {x.post_id === y.parent_post_id ? (
                                <div className="row py-2 px-2">
                                  <div className="card shadow bg-dark border-white">
                                    <h6 className="card-header bg-dark border-bottom border-white text-white">
                                      {y.user_name}
                                    </h6>
                                    <div className="card-body border-bottom border-white text-white py-1">
                                      <p>{y.post_content}</p>
                                    </div>
                                    <div className="card-footer text-end bg-dark py-1">
                                      <div className="row">
                                        {likeExists(y.post_id) ? (
                                          <div
                                            onClick={() =>
                                              handleLike(y.post_id)
                                            }
                                            className="col-1 px-1"
                                          >
                                            <h4>
                                              <i className="bi bi-hand-thumbs-up-fill text-white"></i>
                                            </h4>
                                          </div>
                                        ) : (
                                          <div
                                            onClick={() =>
                                              handleLike(y.post_id)
                                            }
                                            className="col-1 px-1"
                                          >
                                            <h4>
                                              <i className="bi bi-hand-thumbs-up text-white"></i>
                                            </h4>
                                          </div>
                                        )}

                                        <div className="col-1 px-1">
                                          <h4 className="text-white">
                                            {y.likes}
                                          </h4>
                                        </div>

                                        {dislikeExists(y.post_id) ? (
                                          <div
                                            onClick={() =>
                                              handleDislike(y.post_id)
                                            }
                                            className="col-1 px-1"
                                          >
                                            <h4>
                                              <i className="bi bi-hand-thumbs-down-fill text-white"></i>
                                            </h4>
                                          </div>
                                        ) : (
                                          <div
                                            onClick={() =>
                                              handleDislike(y.post_id)
                                            }
                                            className="col-1 px-1"
                                          >
                                            <h4>
                                              <i className="bi bi-hand-thumbs-down text-white"></i>
                                            </h4>
                                          </div>
                                        )}

                                        <div className="col-1 px-1">
                                          <h4 className="text-white">
                                            {y.dislikes}
                                          </h4>
                                        </div>
                                        <div className="col-6"></div>
                                        <div className="col-1 px-1">
                                          {props.user.user_name ===
                                          y.user_name ? (
                                            <Link
                                              to={`/edit-post/${y.post_id}`}
                                            >
                                              <h4>
                                                <i className="bi bi-pencil-square text-white"></i>
                                              </h4>
                                            </Link>
                                          ) : null}
                                        </div>
                                        <div className="col-1 px-1">
                                          {props.user.user_name ===
                                          y.user_name ? (
                                            <div
                                              onClick={() =>
                                                handleDelete(y.post_id)
                                              }
                                            >
                                              <h4>
                                                <i className="bi bi-trash text-danger"></i>
                                              </h4>
                                            </div>
                                          ) : null}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ) : null}
                            </div>
                          ))
                        : null}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="col-3">
          <Follow user={props.user} setValue={setValue} value={value} />
        </div>
      </div>
    </div>
  );
};

export default Posts;
