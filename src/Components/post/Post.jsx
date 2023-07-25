import React, { useEffect, useState } from "react";
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
import "./Post.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";

export default function Post({ post }) {
  // console.log("post in post.jsx", post);
  const PF = "http://localhost:5000/images/";
  const defaultImg =
    "https://c4.wallpaperflare.com/wallpaper/72/624/1004/anime-one-piece-zoro-roronoa-wallpaper-preview.jpg";

  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState("");

  function formatDate(dateString) {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const date = new Date(dateString);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  }
  const handleShareClick = (postid) => {
    setUserId(postid);

    setShowModal(true);

    // console.log("showModal in handleshare", showModal);
  };
  useEffect(() => {
    // console.log("userId in useffect", userId);
  }, [userId]);
  const handleWaClick = () => {
    window.location.href = `https://api.whatsapp.com/send?text=${
      window.location.href + `post/` + userId
    }`;
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  // const [userId, setUserId] = useState("");
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
    handleCloseModal();
  };
  function handlePost(postid) {
    // console.log(postid);
    window.location.replace(`/post/${postid}`);
  }
  return (
    <>
      <section className="blog">
        <div className="container grid3">
          <div className="box boxItems" key={post.id}>
            <div className="img">
              <img src={post.photo ? PF + post.photo : defaultImg} alt="" />
            </div>
            <div className="details">
              {post.category ? (
                <div className="tag">
                  <a href="/">#{post.category}</a>
                </div>
              ) : (
                <div className="tag"></div>
              )}
              <Link
                to="#"
                className="link"
                onClick={() => handlePost(post._id)}
              >
                <h3>{post.title}</h3>
              </Link>
              <p>{post.desc.slice(0, 60)}...</p>
              <div className="date">
                <AiOutlineClockCircle className="icon" />{" "}
                <label htmlFor="">{formatDate(post.createdAt)}</label>
                <AiOutlineComment className="icon" />{" "}
                {post.comments.length ? (
                  <label htmlFor="">{post.comments.length}</label>
                ) : null}
                <AiOutlineShareAlt
                  className="icon"
                  style={{ cursor: "pointer" }}
                  userid={post._id}
                  onClick={(e) => {
                    handleShareClick(post._id);
                  }}
                />{" "}
                <label htmlFor="">SHARE</label>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Modal show={showModal} className="modal" onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Share Post</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <div className="modal-body-top">
            <div className="modal-share-container wa-container">
              <Button
                href={`https://api.whatsapp.com/send?text=${
                  window.location.href + `post/` + userId
                }`}
                target="_blank"
                rel="noopener noreferrer"
                className="share-btn wa-btn"
              >
                <AiOutlineWhatsApp className="modal-whatsapp modal-icon" />
                WhatsApp
              </Button>
            </div>
            <div className="modal-share-container tele-container">
              <Button
                href={`https://t.me/share/url?url=${
                  window.location.href + `post/` + userId
                }`}
                target="_blank"
                rel="noopener noreferrer"
                className="tele-btn share-btn "
              >
                <BsTelegram
                  href={`https://t.me/share/url?url=${
                    window.location.href + `post/` + userId
                  }`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modal-whatsapp  modal-icon"
                />
                Telegram
              </Button>
            </div>
          </div>
          <div className="modal-body-bottom">
            <div className="modal-share-container modal-copy-container">
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
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
