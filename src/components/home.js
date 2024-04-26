import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";

const RepoList = () => {
  //State management
  const [repos, setRepos] = useState(null);
  const navigate = useNavigate();
  const gitRepos = async () => {
    const response = await axios.get(
      "https://api.github.com/search/repositories?q=XXX"
    );
    console.log(response.data.items);
    setRepos(response.data.items);
    return response.data;
  };
  useEffect(() => {
    gitRepos().catch((e) => console.error(e));
  }, []);
  return (
    <div className="users-cont">
      {repos ? (
        repos.map((repo) => (
          <div className="user-card-cont" key={repo.id}>
            <img
              src={repo.owner.avatar_url}
              alt="userAvatar"
              className="user-avatar"
            />
            <span className="username">{repo.name}</span>

            <span className="repo-lang-span">Language: {repo.language}</span>
            <div>
              By:{" "}
              <button
                className="repo-owner"
                onClick={() => navigate(`/users/user/${repo.owner.login}`)}
                to={"/users/user/" + repo.owner.login}
              >
                {repo.owner.login}
              </button>
            </div>

            <button>
              <Link
                to={`https://github.com/${repo.owner.login}/${repo.name}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Repo
              </Link>
            </button>
          </div>
        ))
      ) : (
        <div class="loader"></div>
      )}
    </div>
  );
};

export default RepoList;
