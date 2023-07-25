import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import "./Comments.css";
import SingleComment from "../singleComment/SingleComment";
import { Context } from "../../Context/Context";
import {
  AiOutlinePlusCircle,
  AiOutlineClockCircle,
  AiOutlineComment,
  AiOutlineShareAlt,
  AiOutlineWhatsApp,
  RiWhatsappFill,
  FaTelegram,
} from "react-icons/ai";
import { BiCommentAdd } from "react-icons/bi";
import { MdOutlineCancel } from "react-icons/md";
// import { Toast, ToastContainer,toast } from "react-toastify/dist/components";
import { toast } from "react-toastify";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FaRegCommentDots } from "react-icons/fa";
import { FiCopy } from "react-icons/fi";
import { BsTelegram } from "react-icons/bs";
// import { Link } from "react-router-dom";
// import "./Post.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";

export default function CommentSection({ postId, postdata }) {
  const navigate = useNavigate();

  const { user } = useContext(Context);

  // console.log("postId in comments.jsx", postId);
  // console.log("postdata in comments.jsx", postdata);
  // console.log("user in comments.jsx", user);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showCommentBox, setShowCommentBox] = useState(false);
  // const [isUser, setisUser] = useState(if(user))
  useEffect(() => {
    const fetchComments = async () => {
      const res = await axios.get(`/posts/comments/${postId}`);
      setComments(res.data);
    };
    fetchComments();
  }, [postId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    // {
    //   "CommentUser": "640e1a4f61beb4e3800e9381",
    //    "text": " 4th comment  ",

    //    "postSchemaId": "640f17205bc7c31b949d0d22",
    //    "userSchemaId": "640f0f69ed9a4f9961347097"

    // }
    const res = await axios.post(`/comments/`, {
      CommentUser: user._id,
      text: newComment,
      postSchemaId: postId,
      userSchemaId: postdata.userId ? postdata.userId : postdata.username,
    });
    setComments([...comments, res.data]);
    setNewComment("");
    setShowCommentBox(false);
  };

  const handleCommentBox = () => {
    if (user) {
      setShowCommentBox(true);
    } else {
      navigate("/login", {
        state: {
          commentPostId: postId,
          userInfo: user,
          // add more key-value pairs as needed
        },
      });
    }
  };

  const handleCommentDelete = async (commentId) => {
    await axios.delete(`/comments/${commentId}`);
    setComments(comments.filter((comment) => comment._id !== commentId));
  };
  // console.log("comments in comments.jsx", comments);
  return (
    <div className="comment-section">
      <h2 className="heading">Comments</h2>

      {comments.map((comment) => (
        // console.log("comment in comments.jsx map function :", comment)
        <SingleComment commentData={comment} key={comment._id}></SingleComment>
      ))}
      <div
        className="modal-share-container wa-container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {!showCommentBox && (
          <button
            type="submit"
            className="share-btn add-comment"
            // onClick={() => setShowCommentBox(true)}
            onClick={handleCommentBox}
          >
            <FaRegCommentDots className="modal-whatsapp modal-icon" />
            Add Comment
          </button>
        )}
        {showCommentBox && (
          <div className="comment-box">
            <form onSubmit={handleCommentSubmit}>
              <div className="textarea">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Enter your comment here..."
                />
              </div>
              <div className="btns">
                <button type="submit" className="">
                  <AiOutlinePlusCircle className="modal-whatsapp modal-icon" />
                  Add
                </button>
                <button onClick={() => setShowCommentBox(false)}>
                  <MdOutlineCancel className="modal-whatsapp modal-icon" />
                  Discard
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
      {/* {comments.map((comment) => (
        <SingleComment commentData={comment} key={comment._id} />
      ))} */}
    </div>
  );
}
