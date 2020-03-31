import React, { useState, useEffect, useRef } from "react";
import { Popup } from "semantic-ui-react";
import { storage } from "../src/firebase";

const copyToClipboard = blob => {
  navigator.clipboard
    .write([
      // eslint-disable-next-line no-undef
      new ClipboardItem({
        [blob.type]: blob
      })
    ])
    .then(() => {
      console.log("Copy to Clipboard");
    })
    .catch(e => {
      console.error(e);
    });
};

const createImage = options => {
  options = options || {};
  const img = Image ? new Image() : document.createElement("img");
  if (options.src) {
    img.src = options.src;
  }
  return img;
};

const copyImage = blob => {
  if (blob.type === "image/jpeg") {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const imageUrl = window.URL.createObjectURL(blob);
    const imageEl = createImage({ src: imageUrl });
    imageEl.onload = e => {
      canvas.width = e.target.width;
      canvas.height = e.target.height;
      ctx.drawImage(e.target, 0, 0, e.target.width, e.target.height);
      canvas.toBlob(copyToClipboard, "image/png", 1);
    };
  } else if (blob.type === "image/png") {
    copyToClipboard(blob);
  }
};

const defaultStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translateY(-50%) translateX(-50%) scale(1.0)",
  WebkitTransform: "translateY(-50%) translateX(-50%)",
  borderRadius: "12px",
  border: "1px solid #CCC",
  backgroundColor: "#FFF",
  transition: "transform .5s",
  cursor: "pointer"
};

const hoverStyle = {
  transform: "translateY(-50%) translateX(-50%) scale(1.1)",
};

const EmojiArea = ({ emoji, name }) => {
  let blob = null;
  let timeout;

  const [isOpen, setIsOpen] = useState(false);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const imageRef = useRef(null);

  const handleOpen = () => {
    setIsOpen(true);
    timeout = setTimeout(() => {
      setIsOpen(false);
    }, 2000);
  };

  const handleClose = () => {
    setIsOpen(false);
    clearTimeout(timeout);
  };

  useEffect(() => {
    const ref = storage.refFromURL(emoji);

    ref.getDownloadURL().then(url => {
      const xhr = new XMLHttpRequest();
      xhr.responseType = "blob";
      xhr.onload = () => {
        blob = xhr.response;
      };
      xhr.open("GET", url);
      xhr.send();

      if (imageRef.current) {
        imageRef.current.src = url;
      }
    });
  });

  return (
    <div
      style={{
        textAlign: "center",
        fontSize: "100px",
        height: "200px",
        position: "relative",
        backgroundColor: "whitesmoke"
      }}
    >
      <Popup
        trigger={
          <img
            ref={imageRef}
            width="150px"
            height="150px"
            style={
              isMouseOver
                ? Object.assign({}, defaultStyle, hoverStyle)
                : defaultStyle
            }
            onClick={() => copyImage(blob)}
            onMouseEnter={() => setIsMouseOver(true)}
            onMouseLeave={() => setIsMouseOver(false)}
          />
        }
        content={
          <>
            Copy Image{" "}
            <span style={{ fontSize: "20px", fontWeight: "bold" }}>{name}</span>
          </>
        }
        on="click"
        open={isOpen}
        onClose={handleClose}
        onOpen={handleOpen}
        position="top center"
      />
    </div>
  );
};

export default EmojiArea;
