import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SingleComment.css";
export default function SingleComment({ commentData }) {
  // const [comments, setComments] = useState([]);
  const [commentUser, setCommentUser] = useState("");
  // console.log("commentData in SInglecomments.jsx", commentData);
  useEffect(() => {
    const fetchComments = async () => {
      // const res = await axios.get(`/users/${commentData.CommentUser}`);
      const userRes = await axios.get(
        `/users/comment/${commentData.CommentUser}`
      );
      setCommentUser(userRes.data.username);
    };
    fetchComments();
  }, [commentData]);

  //   const handleCommentSubmit = async (e) => {
  //     e.preventDefault();
  //     const res = await axios.post(`/posts/${postId}/comments`, {
  //       content: newComment,
  //     });
  //     setComments([...comments, res.data]);
  //     setNewComment("");
  //   };

  //   const handleCommentDelete = async (commentId) => {
  //     await axios.delete(`/comments/${commentId}`);
  //     setComments(comments.filter((comment) => comment._id !== commentId));
  //   };
  //   console.log("comments in SInglecomments.jsx", comments);
  //   console.log("commentData in SInglecomments.jsx", commentData);
  //   console.log("commentUser in SInglecomments.jsx", commentUser);
  return (
    <div className="comment">
      <div className="comment__item">
        <div className="flex">
          <div className="img-avatar">
            <img
              src="https://c4.wallpaperflare.com/wallpaper/542/661/246/one-piece-roronoa-zoro-hd-wallpaper-preview.jpg"
              alt="avatar"
              className="comment__item__avatar"
            />
          </div>
          <div className="flex-grow">
            <h3 className="comment__item__title">{commentUser}</h3>

            <h4 className="comment__item__subtitle">@emma_0610</h4>
          </div>

          {/* <button type="button" aria-label="reply" className="btn--reply">
            Reply
          </button> */}
        </div>
        <p className="comment__item__content">{commentData.text}</p>
      </div>
    </div>
  );
}
