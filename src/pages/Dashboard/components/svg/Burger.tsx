import React from 'react';

const Burger: React.FC<{ className: string; onOpen: () => void }> = (props) => {
  return (
    <svg
      className={props.className}
      id='mobileNavBurger'
      width='18'
      height='16'
      viewBox='0 0 18 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      onClick={props.onOpen}
    >
      <path d='M0 0H18V2H0V0ZM6 7H18V9H6V7ZM0 14H18V16H0V14Z' fill='#09121F' />
    </svg>
  );
};

export default Burger;
