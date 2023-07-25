import Sidebar from "../../Components/sidebar/Sidebar";
import SinglePost from "../../Components/singlePost/SinglePost";
import "./Single.css";

export default function Single() {
  return (
    <div className="single">
      <SinglePost />
      {/* <Sidebar /> */}
    </div>
  );
}
