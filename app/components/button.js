// components/Button.js
import React from 'react';

function Button({ onClick, backgroundColor }) {
  return (
    <button
      onClick={onClick}
      style={{ backgroundColor }}
    >
    </button>
  );
}

export default Button;
