import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Stories() {
  const [stories, Setstories] = useState([]);
  const navigate = useNavigate();

  let tot = 0;

  useEffect(() => {
    fetch("http://localhost:3001/stories")
      .then((data) => data.json())
      .then((data) => Setstories(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="story d-flex">
      <div className="d-none">{(tot = stories.length)}</div>

      {stories.length > 0 ? (
        stories.map((story) => (
          <div
            key={story.id}
            className="mx-3"
            onClick={() => {
              navigate(`/stories/${story.id}/${tot}`);
            }}
          >
            <div className="gradient-border">
              <img
                className="story-dp rounded-circle"
                src={story.user.profilePic}
                alt="dp"
              />
            </div>

            <p className="text-truncate" style={{ width: "50px" }}>
              {story.user.username}
            </p>
          </div>
        ))
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
}

export default Stories;
