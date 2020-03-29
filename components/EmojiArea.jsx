import React, { useState, useEffect, useRef } from 'react';
import { storage } from "../src/firebase";

const copyImage = (blob) => {
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