import React, { useState } from "react";
import "./Modal.css";

export default function Modal() {
  const [isOpen, setIsOpen] = useState(false);

  function handleOpenModal() {
    setIsOpen(true);
  }

  function handleCloseModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <button onClick={handleOpenModal}>Open modal</button>

      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <h1>Modal Title</h1>
        <p>Modal content goes here</p>
        <button onClick={handleCloseModal}>Close modal</button>
      </Modal>
    </div>
  );
}

// import React, { useState } from "react";
// import "./Modal.css";
// export default function Modal({ show, onHide }) {
//   const [inputValue, setInputValue] = useState("");

//   const handleInputChange = (event) => {
//     setInputValue(event.target.value);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     console.log("Submitted input value: ", inputValue);
//   };

//   if (!show) {
//     return null;
//   }

//   return (
//     <div className="modal-wrapper">
//       <div className="modal-backdrop" onClick={onHide}>
//         <div className="modal-box">
//           <h2>Example Modal</h2>
//           <p>This is an example modal with some content.</p>
//           <form onSubmit={handleSubmit}>
//             <label>
//               Input:
//               <input
//                 type="text"
//                 value={inputValue}
//                 onChange={handleInputChange}
//               />
//             </label>
//             <button type="submit">Submit</button>
//           </form>
//           <button onClick={onHide}>Close</button>
//         </div>
//       </div>
//     </div>
//   );
// }

{
  /* <Modal >
        <Modal.Header closeButton>
          <Modal.Title>Share Post</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <div className="modal-body-top">
            <div className="modal-share-container wa-container">
              <Button
                // variant="primary"
                href={`https://api.whatsapp.com/send?text=${window.location.href}`}
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
                // variant="info"
                href={`https://t.me/share/url?url=${window.location.href}`}
                target="_blank"
                rel="noopener noreferrer"
                className="tele-btn share-btn "
              >
                <BsTelegram
                  // variant="info"
                  href={`https://t.me/share/url?url=${window.location.href}`}
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
                  Copy Link
                </span>
              </div>
              <Button
                variant="light"
                onClick={handleCopyLink}
                className="share-btn copy-btn "
              >
                {/* Copy Link */
}
//         <FiCopy className="modal-copy-icon modal-icon" />
//       </Button>
//     </div>
//   </div>
// </Modal.Body>
//   </Modal> */}
