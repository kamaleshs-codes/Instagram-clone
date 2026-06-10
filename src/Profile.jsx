import React, { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const [profile, setProfile] = useState(null);

  const [followers, setFollowers] = useState([])

  const [unFollowed, setUnFollowed] = useState(0)

  useEffect(() => {
    axios.get("http://localhost:3001/profile").then((data) => {
      setProfile(data.data);
    }).catch(err => console.log(err))

    axios.get("http://localhost:3001/followers").then((data) => {
      setFollowers(data.data);
    }).catch(err => console.log(err))

  }, [unFollowed]);

  function handleOnChange(e) {
    setProfile((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  const handleUpdate = async () => {
    axios
      .put("http://localhost:3001/profile", profile)
      .then(alert("Updated"))
      .catch((err) => console.log(err));
  };

  const handleUnFollow = async (id) => {
    axios.delete(`http://localhost:3001/followers/${id}`)
      .then(alert("un Followed"))
      .then(setUnFollowed(!unFollowed))
      .catch((err) => console.log(err))
  }

  return (
    <div className="m-5">
      {profile ? (
        <div>
          <img
            className="profile rounded-circle "
            src={profile.profilePic}
            alt=""
          />
          <h5>{profile.username}</h5>
          <input
            className="form-control my-4"
            type="text"
            value={profile.username}
            name="username"
            onChange={handleOnChange}
          />
          <input
            className="form-control"
            type="text"
            name="profilePic"
            value={profile.profilePic}
            onChange={handleOnChange}
          />
          <button onClick={handleUpdate} className="btn btn-primary my-4">
            Update
          </button>
        </div>
      ) : (
        <p>Loading..</p>
      )}

      {followers.length > 0 ? followers.map(follower => (
        <div key={follower.id} className="d-flex my-2">
          {follower.username}
          <button className="btn btn-secondary ms-auto" onClick={() => { handleUnFollow(follower.id) }}>un Follow</button>
        </div>
      )) : <div>Loading..</div>}
    </div>
  );
}

export default Profile;
