import React from "react";

const Modal = ({ isOpen, setIsOpen, width, height, children }) => {
  const outerStyle = {
    position: "absolute",
    display: `${isOpen ? "block" : "none"}`,
    width: "100%",
    height: "100vh",
    zIndex: "1",
    // backdropFilter: "blur(3px)",
    backdropFilter: "brightness(60%)",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };
  const innerStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: `${width ? width : "30%"}`,
    height: `${height ? height : "40vh"}`,
    // backdropFilter: "none",
    padding: "30px",
  };
  return (
    <>
      <div onClick={() => setIsOpen(false)} style={outerStyle}>
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          style={innerStyle}
          className="rounded-xl bg-white border"
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
