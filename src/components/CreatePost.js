import React, { useState, useEffect } from "react";
import { createPost, uploadImage } from "../data/repository";
import { useHistory } from "react-router-dom";

const CreatePosts = (props) => {
  const history = useHistory();
  const [post, setPost] = useState("");
  const [image, setImage] = useState({ file: [], filepreview: null, });
  const [postLength, setPostLength] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setPost(event.target.value);
    setPostLength(post.length);
  };

  const handleFileChange = (event) => {
    setImage({
      ...Image,
      file: event.target.files[0],
      filepreview:URL.createObjectURL(event.target.files[0]),
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('post-image', image.file);
    



    const trimmedPost = post.trim();

    if (trimmedPost === "") {
      setError("Post can not be empty!!");
      return;
    };

    const newPost = {
      post_content: trimmedPost,
      user_name: props.user.user_name,
      image: await uploadImage(formData),
    };
    
    
    // implement create post
    await createPost(newPost);
    history.push("/forum");
 
  };

  return (
    <div className="container py-3">
      <div className="card">
        <h5 className="card-header bg-dark text-white">Add post</h5>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <textarea
                className="form-group p-1 w-100"
                onChange={handleInputChange}
                rows="1"
                placeholder="Whats on your mind?"
              ></textarea>
              <p className="text-muted">Max post length:{postLength}/600</p>
            </div>
            <div className="row">
              <div className="col">
              <button className="btn btn-dark" type="submit">
                  Post
                </button>
              </div>
              <div className="col">
                <div class="input-group mb-3">
                  <label class="input-group-text bg-dark text-white" for="inputGroupFile01">Upload Image</label>
                  <input type="file" class="form-control" id="inputGroupFile01" onChange={ handleFileChange }/>
                </div>                 
                </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePosts;
