import axios from "axios";
import { useContext, useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../Context/Context";
import avatar from "../../assets/images/avatar.svg";
//
import { useNavigation, useLocation } from "react-router-dom";
import "./Login.css";

export default function Login({ url }) {
  const userRef = useRef();
  // const navigation =useNavigation();
  const passwordRef = useRef();

  const location = useLocation();
  // const [postId, setpostId] = useState(null);
  let postId = null;
  useEffect(() => {
    console.log("Location object updated:", location);
  }, [location]);
  const { dispatch, isFetching } = useContext(Context);
  try {
    console.log(location);
    const queryParams = new URLSearchParams(location.search);
    const key1 = queryParams.get("key1");
    const key2 = queryParams.get("key2");
    console.log(queryParams);
    const state = location.state;
    if (state.commentPostId) {
      postId = state.commentPostId;
    }
    const userInfo = state.userInfo;
    console.log(
      "key1: ",
      key1,
      " key2: ",
      key2,
      "postId: ",
      postId,
      "userInfo: ",
      userInfo
    );
  } catch (err) {
    // console.error(err);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    console.log("userRef in login.js", userRef);
    console.log("passwordRef in login.js", passwordRef);
    try {
      const res = await axios.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });

      console.log("res.data in login.js", res.data);

      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });

      !postId && !url && res.data && window.location.replace("/");
      !postId && url && res.data && window.location.replace({ url });
      postId && !url && res.data && window.location.replace(`post/${postId}`);
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  return (
    <div className="login">
      <div className="form-wrapper">
        <div className="user-img">
          <img src={avatar} alt="" />
        </div>
        <span className="loginTitle">Login</span>
        <form className="loginForm" onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            type="text"
            className="loginInput"
            placeholder="Enter your username..."
            ref={userRef}
          />
          <label>Password</label>
          <input
            type="password"
            className="loginInput"
            placeholder="Enter your password..."
            ref={passwordRef}
          />
          <button className="loginButton" type="submit" disabled={isFetching}>
            Login
          </button>
        </form>
        <div className="form-footer">
          <div className="p">
            <p>Don't have an account?</p>
          </div>
          <div className="login-link">
            <Link
              className="link"
              to={{ pathname: "/register", state: location.state }}
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
