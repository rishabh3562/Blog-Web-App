// eslint-disable-next-line
import { useLocation } from "react-router";
// import Header from "../../Components/header/Header";
import Slider from "../../Components/slider/Slider";
import Posts from "../../Components/posts/Posts";
import Sidebar from "../../Components/sidebar/Sidebar";
import "./Homepage.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
export default function Homepage() {
  const [posts, setPosts] = useState([]);
  // eslint-disable-next-line
  const location = useLocation();
  // const search=location.search;
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/posts");
      // console.log("res", res.data);
      setPosts(res.data);
    };
    fetchPosts();
  }, []);
  // console.log("posts", posts);
  // console.log(location);
  return (
    <React.Fragment>
      <Slider className="content-slider" />
      {/* <Header /> */}
      <div className="home">
        <Posts posts={posts} />
        {/* <Sidebar /> */}
      </div>
    </React.Fragment>
  );
}
