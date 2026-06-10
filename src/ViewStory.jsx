import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

function ViewStory() {
  const [stories, setStories] = useState(null);
  const { id, tot } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3001/stories/${id}`)
      .then((data) => data.json())
      .then((data) => setStories(data))
      .catch((err) => console.log(err));
  }, [id]);

  if (id > tot || id <= 0) {
    navigate("/");
  }

  return (
    <div>
      {stories ? (
        <div className="d-flex justify-content-center align-items-center">
          <Link to={`http://localhost:5173/stories/${Number(id) - 1}/${tot}`}>
            <i className="bi bi-arrow-left-circle-fill"></i>
          </Link>
          <img className="vh-100 story-img" src={stories.img} alt="" />
          <Link to={`http://localhost:5173/stories/${Number(id) + 1}/${tot}`}>
            <i className="bi bi-arrow-right-circle-fill"></i>
          </Link>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default ViewStory;
