import React, { useEffect, useState } from "react";

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/posts")
      .then((data) => data.json())
      .then((data) => setPosts(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="d-flex justify-content-center">
      {posts.length > 0 ? (
        <div>
          {posts.map((post) => (
            <div className="my-4" key={post.id}>
              <div className="d-flex">
                <img
                  className="rounded-circle dp"
                  src={post.user.profilePic}
                  alt="Profile-pic"
                />
                <h5>{post.user.username}</h5>
              </div>
              <img className="image " src={post.image} alt="Post" />
              <div>
                <i className="bi bi-heart"></i>
                <i className="bi bi-chat"></i>
                <i className="bi bi-send"></i>
              </div>
              <div>
                <b>{post.likes} Likes</b>
              </div>
              <p>{post.caption}</p>
            </div>
          ))}
        </div>
      ) : (
        <div>Loading Posts</div>
      )}
    </div>
  );
}

export default Posts;
