import React from "react";
import Image from "react-bootstrap/Image";
import classicsheader from "../../public/classicsheader.jpg";

function Header() {
  const headerStyle = {
    position: "relative",
  };

  const textStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    color: "black",
  };

  return (
    <div style={headerStyle}>
      <Image
        src={classicsheader}
        style={{ width: "100%", height: "auto" }}
        alt=""
      />

      <div style={textStyle}>
        <h1>HACKFLIX</h1>
      </div>
    </div>
  );
}

export default Header;
