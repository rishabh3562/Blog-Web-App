import axios from "axios";

import { Link } from "react-router-dom";
import "./SinglePost.css";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
// import { Link } from "react-router-dom";
import { Context } from "../../Context/Context";
import "./SinglePost.css";
import { BsPencilSquare } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import { useParams } from "react-router-dom";
// import { useEffect } from "react";
import { blog } from "../../assets/data/data";
import CommentSection from "../comment/Comments";

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const PF = "http://localhost:5000/images/";
  const { user } = useContext(Context);
  // console.log("user in singlepost.js :", user);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
      // console.log("res in singlePost.js", res);
    };
    getPost();
  }, [path]);
  // console.log("res in singlePost.js", res);
  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${post._id}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) {}
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
      });
      setUpdateMode(false);
    } catch (err) {}
  };
  const style = {
    backgroundImage: `url(${PF + post.photo})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "500px" /* or any desired height */,
    width: "100%" /* or any desired width */,
  };
  // console.log("style", style);
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <div classNam="pic-container">
            <img src={PF + post.photo} alt="" className="singlePostImg" />
          </div>
        )}
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTitle">
            {title}
            {post.username === user?.username && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon far fa-edit"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="singlePostIcon far fa-trash-alt"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author:
            {/* <Link to={`/?user=${post.username}`} className="link"> */}
            <b> {post.username}</b>
            {/* </Link> */}
          </span>
          <span className="singlePostDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="singlePostDesc">{desc}</p>
        )}
        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>

      <div className="comment-section">
        <CommentSection postId={post._id} postdata={post} />
      </div>
    </div>
  );
}

// import axios from "axios";

// import { Link } from "react-router-dom";
// import "./SinglePost.css";
// import { useContext, useEffect, useState } from "react";
// import { useLocation } from "react-router";
// // import { Link } from "react-router-dom";
// import { Context } from "../../Context/Context";
// import "./SinglePost.css";
// export default function SinglePost() {
//   const location = useLocation();
//   const path = location.pathname.split("/")[2];
//   const [post, setPost] = useState({});
//   const PF = "http://localhost:5000/images/";
//   const { user } = useContext(Context);
//   console.log("user in singlepost.js :", user);
//   const [title, setTitle] = useState("");
//   const [desc, setDesc] = useState("");
//   const [updateMode, setUpdateMode] = useState(false);

//   useEffect(() => {
//     const getPost = async () => {
//       const res = await axios.get("/posts/" + path);
//       setPost(res.data);
//       setTitle(res.data.title);
//       setDesc(res.data.desc);
//       console.log("res in singlePost.js", res);
//     };
//     getPost();
//   }, [path]);
//   // console.log("res in singlePost.js", res);
//   const handleDelete = async () => {
//     try {
//       await axios.delete(`/posts/${post._id}`, {
//         data: { username: user.username },
//       });
//       window.location.replace("/");
//     } catch (err) {}
//   };

//   const handleUpdate = async () => {
//     try {
//       await axios.put(`/posts/${post._id}`, {
//         username: user.username,
//         title,
//         desc,
//       });
//       setUpdateMode(false);
//     } catch (err) {}
//   };

//   return (
//     <div className="singlePost">
//       <div className="singlePostWrapper">
//         {post.photo && (
//           <img src={PF + post.photo} alt="" className="singlePostImg" />
//         )}
//         {updateMode ? (
//           <input
//             type="text"
//             value={title}
//             className="singlePostTitleInput"
//             autoFocus
//             onChange={(e) => setTitle(e.target.value)}
//           />
//         ) : (
//           <h1 className="singlePostTitle">
//             {title}
//             {post.username === user?.username && (
//               <div className="singlePostEdit">
//                 <i
//                   className="singlePostIcon far fa-edit"
//                   onClick={() => setUpdateMode(true)}
//                 ></i>
//                 <i
//                   className="singlePostIcon far fa-trash-alt"
//                   onClick={handleDelete}
//                 ></i>
//               </div>
//             )}
//           </h1>
//         )}
//         <div className="singlePostInfo">
//           <span className="singlePostAuthor">
//             Author:
//             <Link to={`/?user=${post.username}`} className="link">
//               <b> {post.username}</b>
//             </Link>
//           </span>
//           <span className="singlePostDate">
//             {new Date(post.createdAt).toDateString()}
//           </span>
//         </div>
//         {updateMode ? (
//           <textarea
//             className="singlePostDescInput"
//             value={desc}
//             onChange={(e) => setDesc(e.target.value)}
//           />
//         ) : (
//           <p className="singlePostDesc">{desc}</p>
//         )}
//         {updateMode && (
//           <button className="singlePostButton" onClick={handleUpdate}>
//             Update
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }
