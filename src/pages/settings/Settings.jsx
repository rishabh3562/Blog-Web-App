import "./Settings.css";
import Sidebar from "../../Components/sidebar/Sidebar";
import { useContext, useState, useEffect } from "react";
import { Context } from "../../Context/Context";
import axios from "axios";
import SettingPost from "../../Components/SettingsPost/SettingPost";
import {
  AiOutlineTags,
  AiOutlineClockCircle,
  AiOutlineComment,
  AiOutlineShareAlt,
  AiOutlineWhatsApp,
  RiWhatsappFill,
  FaTelegram,
} from "react-icons/ai";
// import { Toast, ToastContainer,toast } from "react-toastify/dist/components";
import { toast } from "react-toastify";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FiCopy } from "react-icons/fi";
import { BsTelegram } from "react-icons/bs";
import { Link } from "react-router-dom";
// import "./Post.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";

// import avatar from "https://wallpaperaccess.com/full/8375570.jpg";
import { FaUserEdit, FaUpload } from "react-icons/fa";
import { BsUpload } from "react-icons/bs";
// import { FaUpload } from "react-icons/";

export default function Settings() {
  const [userId, setUserId] = useState("");
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href + `post/` + userId);

    toast.success("🔗Link Copied to Clipboard !", {
      position: "bottom-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    // handleCloseModal();
  };
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:5000/images/";

  const [posts, setPosts] = useState([]);
  console.log("user in settings", user);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(`/users/${user._id}/posts`);
      const postRes = await axios.post(`/posts/postsByIds`, {
        postIds: res.data,
      });
      console.log("res in settings.js", res);
      console.log("postRes in settings.js", postRes.data);
      setPosts(postRes.data);
    };
    fetchPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      console.log("data in settings.js", data);
      console.log("file in settings.js", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axios.put("/users/" + user._id, updatedUser);
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };
  console.log("posts in settings", posts);
  return (
    <div className="settings-page">
      <div className="settings">
        <div className="settingsWrapper">
          <div className="settingsTitle">
            <span className="settingsUpdateTitle">Update Your Account</span>
            <span className="settingsDeleteTitle">Delete Account</span>
          </div>
          <form className="settingsForm" onSubmit={handleSubmit}>
            {/* <label>Profile Picture</label> */}
            <div className="img-container">
              <div className="settingsPP">
                <img
                  // src={file ? URL.createObjectURL(file) : PF + user.profilePic}
                  src={"https://wallpaperaccess.com/full/8375570.jpg"}
                  alt=""
                />
                <label htmlFor="fileInput">
                  <FaUpload className="settingsPPIcon" />
                  {/* <i className=" far fa-user-circle"></i> */}
                </label>
                <input
                  type="file"
                  id="fileInput"
                  style={{ display: "none" }}
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
            </div>
            <label>Username</label>
            <input
              type="text"
              placeholder={user.username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label>Email</label>
            <input
              type="email"
              placeholder={user.email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="settingsSubmit" type="submit">
              <FaUserEdit
                className="modal-icon"
                style={{ marginRight: ".5rem" }}
              />
              Update
            </button>
            {success && (
              <span
                style={{
                  color: "green",
                  textAlign: "center",
                  marginTop: "20px",
                }}
              >
                Profile has been updated...
              </span>
            )}
          </form>
        </div>
        {/* <Sidebar /> */}
      </div>

      <div className="posts-section">
        <div className="setting-post-title" style={{ marginTop: "2rem" }}>
          <h2>Your Recent Post Activities</h2>
        </div>
        {posts.map((ele, i) => (
          <SettingPost post={posts[i]} key={posts[i]._id} />
        ))}
      </div>
    </div>
  );
}
{
  /* <div className="modal-share-container modal-copy-container">
              <div className="modal-copy-text-container">
                <span
                  className="modal-copy-text"
                  style={{ marginLeft: ".5rem" }}
                >
                  {window.location.href + `post/` + userId}
                </span>
              </div>
              <Button
                variant="light"
                onClick={handleCopyLink}
                className="share-btn copy-btn "
              >
                <FiCopy className="modal-copy-icon modal-icon" />
              </Button>
            </div> */
}
