import React, { ReactNode } from 'react';
import { AuthNavbar } from 'components';
import { Vaccine } from 'assets';

const AuthWrapper: React.FC<{
  children: ReactNode;
  welcomeText: string;
  pageInfo: string;
  welcomeId: string;
}> = (props) => {
  return (
    <div className=' flex flex-row justify-between'>
      <div className=' px-5 py-10 w-full md:px-28 md:w-3/4 2xl:w-2/5'>
        <AuthNavbar />
        <h2 className=' font-black text-2xl mt-16' id={props.welcomeId}>
          {props.welcomeText}
        </h2>
        <p className=' text-xl text-grayish my-4'>{props.pageInfo}</p>

        {props.children}
      </div>
      <img
        src={Vaccine}
        alt='vaccine'
        className=' hidden h-screen w-5/12 lg:block xl:w-2/3 2xl:w-5/12'
      />
    </div>
  );
};

export default AuthWrapper;
