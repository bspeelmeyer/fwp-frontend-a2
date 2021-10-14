import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
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
    <div className="container w-50">
      <div className="row py-1">
        <Link to="/create-post"><button className="btn btn-dark w-100">Create Post</button></Link>
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
              <div className="card">
                <h5 className="card-header bg-dark text-white">{x.user_name}</h5>
                <div className="card-body">
                  <p>{x.post_content}</p>
                </div>
                {x.image === null ? null :
                (<img className="card-img-mid" src={`http://localhost:4500/static/${x.image}`} alt="Post_image" />
                )}
                <div className="card-footer bg-dark">
                  <div className="row">
                    <div className="col-10"></div>
                    <div className="col-1 px-1">
                      {props.user.user_name === x.user_name ? (
                        <Link to="/"><h3><i className="bi bi-pencil-square text-white"></i></h3></Link>
                      ) : null}
                    </div>
                    <div className="col-1 px-1">
                      <Link to="/"><h3><i className="bi bi-reply text-white"></i></h3></Link>
                    </div>
                  </div>
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
