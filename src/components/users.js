import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import Notfound from "./notfound";
import "./styles.css";

const Users = () => {
  //State management
  const [gitUsers, setGitUsers] = useState([]);
  const navigate = useNavigate();
  const [previousIDs, setPreviousIDs] = useState([]);
  const [previousID, setPreviousID] = useState();
  const [nextId, setNextID] = useState(0);
  const [currentId, setCurrentId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleNextButton = () => {
    setPreviousIDs([...previousIDs, previousID]);
    setCurrentId(nextId);
  };

  const handlePreviousButton = () => {
    previousIDs.length > 0 &&
      setCurrentId(previousIDs.reduce((acc, current) => current));
    setPreviousIDs(previousIDs.slice(0, -1));
  };

  const getGitUsers = async () => {
    setIsLoading(true);
    const response = await axios.get(
      `https://api.github.com/users?since=${currentId}`
    );

    console.log(response.data);
    setGitUsers(response.data);
    setPreviousID(response.data[0].id - 1);

    setNextID(response.data[29].id);
    setIsLoading(false);
    return response.data;
  };

  useEffect(() => {
    getGitUsers().catch((e) => console.error(e));
  }, [currentId]);
  return (
    <>
      {isLoading ? (
        <div class="loader"></div>
      ) : (
        <div style={{ marginTop: "50px" }}>
          {" "}
          <div className="users-cont fade-style">
            {gitUsers.map((user) => (
              <div className="user-card-cont" key={user.id}>
                <img
                  src={user.avatar_url}
                  alt="userAvatar"
                  className="user-avatar"
                />
                <span className="username">{user.login}</span>
                <button
                  onClick={() => navigate(`/users/user/${user.login}`)}
                  to={"/users/user/" + user.login}
                >
                  Get user
                </button>
              </div>
            ))}
            <i className="bi bi-arrow-left"></i>
          </div>
          <div>
            <button onClick={handlePreviousButton}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-arrow-left"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
                />
              </svg>
            </button>
            <button onClick={handleNextButton}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-arrow-right"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Users;
