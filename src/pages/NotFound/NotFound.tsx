import React from 'react';
import { Link } from 'react-router-dom';
import { NotFoundGif } from 'assets';

const NotFound: React.FC<{ isLoggedIn: boolean }> = (props) => {
  return (
    <div className=' w-screen h-[80vh] flex justify-center items-center flex-col gap-6 px-2'>
      <img src={NotFoundGif} alt='404' />
      <div className='flex flex-col xs:flex-row items-center text-xl gap-2'>
        <p>There's nothing to see here</p>
        <Link
          to={props.isLoggedIn ? '/' : '/login'}
          className=' underline font-semibold'
        >
          GO BACK
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
