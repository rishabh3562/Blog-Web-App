import React, { useState, useContext } from "react";
import "./Topbar.css";
import { SiInstagram } from "react-icons/si";
import { BsInstagram } from "react-icons/bs";
// import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../Context/Context";
import { RxAvatar } from "react-icons/rx";

function Navbar(params) {
  const { user, dispatch } = useContext(Context);
  console.log("user in Topbar.jsx", user);
  const PF = "http://localhost:5000/images/";

  const [isMenu, setIsMenu] = useState(false);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const handleMenuIcon = (e) => {
    setIsMenu(!isMenu);
  };

  return (
    <header className="header">
      <div className="topLeft">
        <a href="/">
          <i className="topIcon fa-brands fa-github"></i>
        </a>
        <a href="/">
          <i className="topIcon fa-brands fa-linkedin-in"></i>
        </a>
        <a href="/" className="instagram">
          {/* <BsInstagram className="topIcon" /> */}
          <i className="topIcon insta fa-brands fa-instagram"></i>
        </a>
      </div>
      {/* <a href="/" className="logo">
        Portfolio
      </a> */}
      <i
        className={isMenu ? "fa-solid fa-xmark" : "fa-solid fa-bars"}
        onClick={handleMenuIcon}
        id="menu-icon"
      ></i>
      <nav className={`navbar ${isMenu ? "navbar-open" : ""}`}>
        <ul className="topList">
          <li className="topListItem active">
            <Link className="link active " to="/">
              Home
            </Link>
          </li>

          <li className="topListItem">
            <Link className="link" to="/">
              About
            </Link>
          </li>

          <li className="topListItem">
            <Link className="link" to="/write">
              Write
            </Link>
          </li>

          <li className="topListItem" onClick={handleLogout}>
            {user && "Logout"}
          </li>
        </ul>
      </nav>
      <div className="topRight">
        {user ? (
          <Link to="/settings">
            {user.profilePic ? (
              <img className="topImg" src={PF + user.profilePic} alt="" />
            ) : (
              <RxAvatar className="avatar-icon" />
            )}
          </Link>
        ) : (
          <ul className="topList">
            <li
              className="topListItem "
              style={{ display: "block !important" }}
            >
              <Link className="link" to="/login">
                Login
              </Link>
            </li>
            <li
              className="topListItem "
              style={{ display: "block !important" }}
            >
              <Link className="link signup" to="/login">
                SignUp
              </Link>
            </li>
          </ul>
        )}
        {/* <i className="topSearchIcon fas fa-search"></i> */}
      </div>
    </header>
  );
}

export default Navbar;

// import { useContext } from "react";
// import { Link } from "react-router-dom";
// import { Context } from "../../Context/Context";
// import { RxAvatar } from "react-icons/rx";
// // RxAvatar
// import "./Topbar.css";

// export default function Topbar() {
//   const { user, dispatch } = useContext(Context);
//   console.log("user in Topbar.jsx", user);
//   const PF = "http://localhost:5000/images/";

//   const handleLogout = () => {
//     dispatch({ type: "LOGOUT" });
//   };
//   return (
//     <>
//       <div className="top">
//         <div className="topLeft">
//           <a href="/">
//             <i className="topIcon fa-brands fa-github"></i>
//           </a>
//           <a href="/">
//             <i className="topIcon fa-brands fa-linkedin-in"></i>
//           </a>

//           <a href="/" className="instagram">
//             <i className="topIcon insta fa-brands fa-instagram"></i>
//           </a>
//         </div>
//         <div className="topCenter">
//           <ul className="topList">
//             <li className="topListItem active">
//               <Link className="link " to="/">
//                 HOME
//               </Link>
//             </li>
//             <li className="topListItem">
//               <Link className="link" to="/">
//                 ABOUT
//               </Link>
//             </li>
//             {/* <li className="topListItem">
//               <Link className="link" to="/">
//                 CONTACT
//               </Link>
//             </li> */}
//             <li className="topListItem">
//               <Link className="link" to="/write">
//                 WRITE
//               </Link>
//             </li>
//             <li className="topListItem" onClick={handleLogout}>
//               {user && "LOGOUT"}
//             </li>
//           </ul>
//         </div>
//         <div className="topRight">
//           {user ? (
//             <Link to="/settings">
//               {user.profilePic ? (
//                 <img className="topImg" src={PF + user.profilePic} alt="" />
//               ) : (
//                 <RxAvatar className="avatar-icon" />
//               )}
//             </Link>
//           ) : (
//             <ul className="topList">
//               <li className="topListItem">
//                 <Link className="link" to="/login">
//                   LOGIN
//                 </Link>
//               </li>
//               <li className="topListItem">
//                 <Link className="link" to="/register">
//                   REGISTER
//                 </Link>
//               </li>
//             </ul>
//           )}
//           {/* <i className="topSearchIcon fas fa-search"></i> */}
//         </div>
//       </div>
//       <div className="top-md-xs">
//         <div className="left">hamburger</div>
//       </div>
//     </>
//   );
// }
