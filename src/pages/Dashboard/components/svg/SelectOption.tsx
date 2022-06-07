import React from 'react';

const SelectChosen: React.FC<{ order?: string }> = (props) => {
  let fillUp: string;
  let fillDown: string;
  if (props.order === 'asc') {
    fillUp = '#010414';
    fillDown = '#BFC0C4';
  } else if (props.order === 'desc') {
    fillUp = '#BFC0C4';
    fillDown = '#010414';
  } else {
    fillUp = '#BFC0C4';
    fillDown = '#BFC0C4';
  }
  return (
    <svg
      className=' w-3 md:w-4'
      width='16'
      height='24'
      viewBox='0 0 16 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M8 18.5L3 13.5H13L8 18.5Z' fill={fillDown} />
      <path d='M8 5.5L13 10.5L3 10.5L8 5.5Z' fill={fillUp} />
    </svg>
  );
};

export default SelectChosen;
