import React, { useState, useEffect, useRef } from 'react';
import { storage } from "../src/firebase";

const copyToClipboard = (blob) => {
  navigator.clipboard.write([
    new ClipboardItem({
      [blob.type]: blob
    })
  ])
    .then(() => {
      console.log("Copy to Clipboard");
    })
    .catch((e) => {
      console.error(e);
    });
}

const createImage = (options) => {
  options = options || {};
  const img = (Image) ? new Image() : document.createElement("img");
  if (options.src) { img.src = options.src; }
  return img;
}

const copyImage = (blob) => {
  if (blob.type === "image/jpeg") {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const imageUrl = window.URL.createObjectURL(blob);
    const imageEl = createImage({ src: imageUrl });
    imageEl.onload = (e) => {
      canvas.width = e.target.width;
      canvas.height = e.target.height;
      ctx.drawImage(e.target, 0, 0, e.target.width, e.target.height);
      canvas.toBlob(copyToClipboard, "image/png", 1);
    };
  } else if (blob.type === "image/png") {
    copyToClipboard(blob);
  }
}

const EmojiArea = ({
  emoji,
}) => {
  let blob = null;
  const imageRef = useRef(null);

  useEffect(() => {
    const ref = storage.refFromURL(emoji);

    ref.getDownloadURL().then((url) => {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = () => {
        blob = xhr.response;
      };
      xhr.open('GET', url);
      xhr.send();
    
      imageRef.current.src = url;
    });
  })

  return (
    <div style={{
      textAlign: 'center',
      fontSize: '100px',
      height: '200px',
      position: 'relative',
    }}>
      <img ref={imageRef} width="150px" height="150px"
        style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translateY(-50%) translateX(-50%)',
          WebkitTransform: 'translateY(-50%) translateX(-50%)',
        }}
        onClick={() => copyImage(blob)}
      />
    </div>
  );
}

export default EmojiArea;