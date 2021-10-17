import React, { useState, useRef } from "react";
import { createPost, uploadImage } from "../data/repository";
import { useHistory } from "react-router-dom";

const CreatePosts = (props) => {
  const history = useHistory();
  const ref = useRef();
  const [post, setPost] = useState("");
  const [image, setImage] = useState({ file: [], filepreview: null });
  const [postLength, setPostLength] = useState(null);
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);

  // Change handler, handles post length and content
  const handleInputChange = (event) => {
    setPost(event.target.value);
    setPostLength(post.length);
  };

  // Handles the file input change
  const handleFileChange = (event) => {
    setImage({
      ...Image,
      file: event.target.files[0],
      filepreview: URL.createObjectURL(event.target.files[0]),
    });
  };

  // If cancel is clicked, page will render
  // forum component
  const handleCancel = () => {
    history.push("/forum");
  };

  // Reset the image upload field
  const handleImageCancel = () => {
    ref.current.value = "";
    setImage({ file: [], filepreview: null });
  };

  // Handles the submission of the create post
  // form
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Adds the image data to the form data instance
    const formData = new FormData();
    formData.append("post-image", image.file);

    // Create a variable to assign
    // file name
    let filename = null;

    // If condition ensures function
    // doesn't try to upload a null
    //image
    if (image.file.length !== 0) {
      // Assign the file name return from
      // the uploadImage function, for th purpose
      // of storing the file name in the database
      filename = await uploadImage(formData);
    }

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
      image: filename,
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
    <div className="container  py-3">
      {/* Conditional rendering of alerts */}
      <div className="row py-2">
        {success ? (
          <div className="alert alert-success shadow-lg" role="alert">
            <p>Created post successfully.</p>
          </div>
        ) : fail ? (
          <div className="alert alert-danger shadow-lg" role="alert">
            <p>Post cannot be empty.</p>
          </div>
        ) : null}
      </div>
      <div className="card shadow-lg">
        <h5 className="card-header bg-dark text-white">Add post</h5>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row px-2">
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
              <div className="col-10">
                <div class="input-group">
                  <label
                    class="input-group-text bg-dark text-white"
                    for="inputGroupFile01"
                  >
                    Upload Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    class="form-control"
                    ref={ref}
                    id="inputGroupFile01"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
              <div className="col-2">
                <button
                  className="btn btn-dark w-100"
                  onClick={handleImageCancel}
                >
                  Remove Image
                </button>
              </div>
            </div>
            <div className="row py-2">
              <div className="col">
                <button className="btn btn-dark w-100" type="submit">
                  Post
                </button>
              </div>
              <div className="col">
                <button className="btn btn-dark w-100" onClick={handleCancel}>
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

export default CreatePosts;
