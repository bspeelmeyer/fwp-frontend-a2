import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { getAllPosts } from "../data/repository";
import CreatePosts from "./CreatePost";
import { SpinningCircles } from "react-loading-icons";

const Posts = (props) => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  // Method credit week 8 tutorial
  useEffect(() => {
    async function loadPosts() {
      const currentPosts = await getAllPosts();

      setPosts(currentPosts);
      setIsLoading(false);
    }
    loadPosts();
  }, []);

  if (props.user == null) {
    history.push("/signin");
    return null;
  }

  return (
    <div className="container">
      <div className="row">
        <CreatePosts {...props} />
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
            <div className="card">
              <div className="card-header">{x.user_name}</div>
              <div className="card-body">
                <div className="row">
                  <p>{x.post_content}</p>
                  <img src={`http://localhost:4500/static/${x.image}`} alt="wrong"></img>
                </div>
                <div className="row">
                  <button className="btn btn-dark">Reply</button>
                  {props.user.user_name === x.user_name ? (
                    <button className="btn btn-dark">Edit</button>
                  ) : null}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Posts;
