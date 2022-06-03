import React from 'react';

const Button: React.FC<{ text: string }> = (props) => {
  return (
    <button
      type='submit'
      className=' w-full bg-main-green font-black text-white py-4 rounded-lg'
    >
      {props.text}
    </button>
  );
};

export default Button;
