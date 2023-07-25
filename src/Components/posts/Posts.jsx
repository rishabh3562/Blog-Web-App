import Post from "../post/Post";
import "./Posts.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Posts({ posts }) {
  return (
    <div className="posts">
      {posts.map((p) => (
        <Post post={p} key={p._id} />
      ))}
      <ToastContainer style={{ zIndex: 20 }} />
    </div>
  );
}
