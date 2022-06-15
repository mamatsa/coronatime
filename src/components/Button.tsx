import React from 'react';

const Button: React.FC<{ text: string; id?: string; classes?: string }> = (
  props
) => {
  return (
    <button
      type='submit'
      className={`bg-main-green font-black text-white py-4 rounded-lg ${
        props.classes ? props.classes : 'w-full'
      }`}
      id={props.id}
    >
      {props.text}
    </button>
  );
};

export default Button;
