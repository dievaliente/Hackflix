import React from "react";
import Image from "react-bootstrap/Image";

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
    color: "#fff",
  };

  return (
    <div style={headerStyle}>
      <Image
        src="https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2021%2F10%2F13%2FEW-Movies-Header-2021.png&amp;h=480&amp;q=60"
        style={{ width: "100%", height: "auto" }}
        alt=""
      />

      <div style={textStyle}>
        <h1>Tus peliculas favoritas!</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
          officia nihil reprehenderit.
        </p>
      </div>
    </div>
  );
}

export default Header;
