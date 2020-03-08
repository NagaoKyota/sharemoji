import React from 'react';

const EmojiArea = ({
  emoji,
}: any) => (
  <div style={{
    textAlign: 'center',
    fontSize: '100px',
    height: '200px',
    position: 'relative',
  }}>
    <img src={emoji} alt="emoji" style={{
      position: 'absolute',
      top: '50%', left: '50%',
      transform: 'translateY(-50%) translateX(-50%)',
      WebkitTransform: 'translateY(-50%) translateX(-50%)',
      fontFamily: 'Apple Color Emoji,Segoe UI Emoji,Noto Color Emoji,Segoe UI Symbol,Android Emoji,EmojiSymbols',
    }}
    />
  </div>
);

export default EmojiArea;