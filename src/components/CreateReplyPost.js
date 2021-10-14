import React, { useState, useEffect } from "react";
import { createPost } from "../data/repository";
import { useHistory, useParams } from "react-router-dom";

const CreateReplyPost = (props) => {
  const history = useHistory();
  const [post, setPost] = useState("");
  const [postLength, setPostLength] = useState(null);
  const [error, setError] = useState(null);

  const { id } = useParams();
  console.log(id);

  const handleInputChange = (event) => {
    setPost(event.target.value);
    setPostLength(post.length);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedPost = post.trim();
    if (trimmedPost === "") {
      setError("Post can not be empty!!");
      return;
    }

    const newPost = {
      post_content: trimmedPost,
      user_name: props.user.user_name,
      parent_post_id: id,
    };

    // implement create post
    await createPost(newPost);
    history.push("/forum");
  };

  return (
    <div className="container w-50 py-3">
      <div className="card">
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
              <p className="text-muted my-1 px-0">Max post length:{postLength}/600</p>
            </div>
            <div className="row">
              <div className="col-2">
                <button className="btn btn-dark" type="submit">
                  Post
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
