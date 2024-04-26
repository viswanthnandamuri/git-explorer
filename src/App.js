import logo from "./logo.svg";
import "./App.css";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Home from "./components/home";
import AboutUs from "./components/about";
import Users from "./components/users";
import Navbar from "./components/navbar";
import Notfound from "./components/notfound";
import UserProfile from "./components/userProfile";
import SearchUser from "./components/searchUser";
import Login from "./components/login";
import AuthProfile from "./components/authProfile";
import { useState } from "react";
import { SwitchTransition, CSSTransition } from "react-transition-group";

function App() {
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  return (
    <div className="App">
      <SwitchTransition component={null}>
        <CSSTransition
          key={location.pathname}
          classNames="fade"
          timeout={300}
          unmountOnExit
        >
          <Routes location={location}>
            <Route exact path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/user/:username" element={<UserProfile />} />
            <Route path="/search" element={<SearchUser />}></Route>
            <Route
              path="/login"
              element={
                <Login setIsLogged={setIsLoggedIn} setUsername={setUsername} />
              }
            ></Route>
            <Route
              path="/authProfile"
              element={
                isLoggedIn ? (
                  <AuthProfile username={username} />
                ) : (
                  <Navigate replace to={"/login"} />
                )
              }
            ></Route>

            <Route path="*" element={<Notfound />}></Route>
          </Routes>
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
}

export default App;
