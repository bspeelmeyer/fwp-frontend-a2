import React, { useState } from "react";
import { createPost } from "../data/repository";
import { useHistory, useParams } from "react-router-dom";

const CreateReplyPost = (props) => {
  const history = useHistory();
  const [post, setPost] = useState("");
  const [postLength, setPostLength] = useState(null);
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);

  // Gets the parent post_id from the URL
  const { id } = useParams();

  // Change handler, handles post length and content
  const handleInputChange = (event) => {
    setPost(event.target.value);
    setPostLength(post.length);
  };

  // If cancel is clicked, page will render
  // forum component
  const handleClick = () => {
    history.push("/forum");
  };

  // Handles the submission of the reply post
  // form
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Trim post, method sourced from
    // week 8 demo
    const trimmedPost = post.trim();
    if (trimmedPost === "") {
      // Show bootstrap alert
      setFail(true);
      return;
    }

    // Create post object to send to
    // the database
    const newPost = {
      post_content: trimmedPost,
      user_name: props.user.user_name,
      parent_post_id: id,
    };

    // Make API call to send data
    // to the database
    await createPost(newPost);
    setSuccess(true);

    // Delay redirect so user
    // can see confirmation message
    setTimeout(function () {
      history.push("/forum");
    }, 2000);
  };

  return (
    <div className="container w-50 py-3">
      {/* Conditional rendering of alerts */}
      <div className="row py-2">
        {success ? (
          <div className="alert alert-success shadow-lg" role="alert">
            <p>Replied successfully.</p>
          </div>
        ) : fail ? (
          <div className="alert alert-danger shadow-lg" role="alert">
            <p>Post cannot be empty.</p>
          </div>
        ) : null}
      </div>
      <div className="card shadow-lg">
        <h5 className="card-header bg-dark text-white">Add reply</h5>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row px-3">
              <textarea
                className="form-group px-1 w-100"
                onChange={handleInputChange}
                rows="1"
                value={post}
                placeholder="Whats on your mind?"
              ></textarea>
              <p className="text-muted my-1 px-0">
                Max post length:{postLength}/600
              </p>
            </div>
            <div className="row">
              <div className="col">
                <button className="btn btn-dark w-100" type="submit">
                  Post
                </button>
              </div>
              <div className="col">
                <button className="btn btn-dark w-100" onClick={handleClick}>
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateReplyPost;
