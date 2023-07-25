import "./Register.css";
import axios from "axios";
import avatar from "../../assets/images/avatar.svg";
import { useState, useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Context } from "../../Context/Context";

export default function Register() {
  // console.log(History);
  const location = useLocation();
  const { user } = useContext(Context); // get user details from context
  const [username, setUsername] = useState(user ? user.username : ""); // set initial username from context if available
  const [email, setEmail] = useState(user ? user.email : ""); // set initial email from context if available
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  console.log("location in register :", location);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const sendData = {
        username: username,
        email: email,
        password: password,
      };
      console.log("sendData in register.js :", sendData);
      const res = await axios.post("/auth/register", sendData);
      console.log("res in register.js :", res);
      res.data && window.location.replace("/login");
      console.log("res in register.js :", res);
      console.log("sendData in register.js :", sendData);
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="register">
      <div className="form-wrapper">
        <div className="user-img">
          <img src={avatar} alt="" />
        </div>
        <span className="registerTitle">Sign Up</span>
        <form className="registerForm" onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            type="text"
            className="registerInput"
            placeholder="Enter your username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input
            type="text"
            className="registerInput"
            placeholder="Enter your email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            className="registerInput"
            placeholder="Enter your password..."
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="registerButton" type="submit">
            Register
          </button>
        </form>
        <div className="form-footer">
          <div className="p">
            <p>Have account?</p>
          </div>
          <div className="login-link">
            <Link className="link" to="/login">
              Login
            </Link>
          </div>
        </div>
        {error && (
          <span style={{ color: "red", marginTop: "10px" }}>
            Something went wrong!
          </span>
        )}
      </div>
    </div>
  );
}
