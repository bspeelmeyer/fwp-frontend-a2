import React, { useState, useRef } from "react";
import { createPost, uploadImage } from "../data/repository";
import { useHistory } from "react-router-dom";

const CreatePosts = (props) => {
  const history = useHistory();
  const ref = useRef();
  const [post, setPost] = useState("");
  const [image, setImage] = useState({ file: [], filepreview: null });
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
      filepreview: URL.createObjectURL(event.target.files[0]),
    });
  };

  const handleCancel = () => {
    history.push("/forum");
  };

  const handleImageCancel = () => {
    ref.current.value = "";
    setImage({ file: [], filepreview: null });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("post-image", image.file);

    let filename = null;

    if (image.file.length !== 0) {
      filename = await uploadImage(formData);
    }
    const trimmedPost = post.trim();
    if (trimmedPost === "") {
      setError("Post can not be empty!!");
      return;
    }

    const newPost = {
      post_content: trimmedPost,
      user_name: props.user.user_name,
      image: filename,
    };

    // implement create post
    await createPost(newPost);
    setPost("");
    setPostLength(0);

    history.push("/forum");
  };

  return (
    <div className="container  py-3">
      <div className="card">
        <h5 className="card-header bg-dark text-white">Add post</h5>
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
                <button className="btn btn-dark w-100" onClick={ handleImageCancel}>Remove Image</button>
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
