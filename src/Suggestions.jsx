import axios from "axios";
import React, { useEffect, useState } from "react";

function Suggestions() {
  const [profile, setProfile] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/profile")
      .then((data) => data.json())
      .then((data) => setProfile(data))
      .catch((err) => console.log(err));
    fetch("http://localhost:3001/suggestions")
      .then((data) => data.json())
      .then((data) => setSuggestions(data))
      .catch((err) => console.log(err));
  }, []);

  const handleFollow = async (id, username) => {
    axios.post("http://localhost:3001/followers", { "id": id, "username": username })
      .then(alert('followed'))
      .catch(err => console.log(err))
  }

  return (
    <div>
      <div className="suggestions w-75 m-4">
        {profile ? (
          <div className="suggestion-my-user ">
            <img
              className="rounded-circle dp my-2"
              src={profile.profilePic}
              alt="Profile-pic"
            />
            <h5>{profile.username}</h5>
            <small className="switch text-primary ms-auto">Switch</small>
          </div>
        ) : (
          <p>Loading..</p>
        )}
        <div className="d-flex my-2">
          <p>Suggested for you</p>
          <b className="ms-auto">
            {" "}
            <small>See all</small>
          </b>
        </div>

        {suggestions.length > 0 ? (
          <div>
            {suggestions.map((suggestion) => (
              <div className="mb-2" key={suggestion.id}>
                <div className="d-flex">
                  <img
                    className="rounded-circle dp"
                    src={suggestion.profilePic}
                    alt="Profile-pic"
                  />
                  <h5 className="">{suggestion.username}</h5>
                  <a className="text-primary ms-auto follow" onClick={() => { handleFollow(suggestion.id, suggestion.username) }}>Follow</a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>Loading..</div>
        )}
      </div>
    </div>
  );
}

export default Suggestions;
