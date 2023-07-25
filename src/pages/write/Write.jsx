import { useContext, useState } from "react";
import "./Write.css";
import axios from "axios";
import { Context } from "../../Context/Context";

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);
  console.log("user in write.jsx", user);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      console.log("file state in write.js:", file);
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/upload", data);
        console.log("file uploaded ,data is :", data);
      } catch (err) {
        console.log('err occured in wirte.js axios.post("/upload",data)', err);
      }
    }
    try {
      console.log("newPost in write.js", newPost);
      const res = await axios.post("/posts", newPost);
      console.log("res in write.js axios.post('/posts',newPost)", res._id);
      try {
        const res2 = await axios.post(`users/${user._id}/posts`, {
          postId: `${res.data._id}`,
        });
        console.log(
          `res2 in write.js axios.post("users/${user._id}/posts", res.data._id);"`,
          res2
        );
      } catch (e) {
        console.error(
          "err in write.js axios.post(`users/${user._id}/posts`)",
          e
        );
      }
      console.log(`res in write.js axios.post("/posts", newPost);"`, res);

      // console.log(`res in write.js axios.post("/posts", newPost);"`, res);
      window.location.replace("/post/" + res.data._id);
    } catch (err) {
      console.error("err in write.js axios.post('/posts',newPost)", err);
    }
  };
  return (
    <div className="write">
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Tell your story..."
            type="text"
            className="writeInput writeText"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}
