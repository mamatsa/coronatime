import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Vaccine } from 'assets/images';
import { Logo } from 'components/svg';
import axios from 'axios';
import { Input, Button } from 'components';

type FormInputs = {
  username: string;
  email: string;
  password: string;
  password2: string;
};

const baseURL: string = 'https://coronatime-api.devtest.ge/api/register';

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, dirtyFields },
  } = useForm<FormInputs>({
    mode: 'onChange',
    shouldUnregister: true,
  });

  const onSubmit: SubmitHandler<FormInputs> = (data) =>
    registerUser(data.username, data.email, data.password, data.password2);

  const passwordsMatch = () => {
    return watch('password') === watch('password2');
  };

  const navigate = useNavigate();

  const registerUser = (
    username: string,
    email: string,
    password: string,
    repeatPassword: string
  ) => {
    axios
      .post(baseURL, {
        username,
        email,
        password,
        repeatPassword,
        redirectOnConfirm: `${window.location.host}/register/confirm/success`,
      })
      .then((response) => {
        navigate('/register/confirm');
      })
      .catch((error) => {
        const errorObj = error.response.data[0];
        setError(errorObj.context.label, {
          type: 'custom',
          message: errorObj.message,
        });
      });
  };

  return (
    <div className=' flex flex-row justify-between'>
      <div className=' px-5 md:px-28 py-10 '>
        <Logo />
        <h2 className=' font-black text-2xl mt-16'>Welcome to Coronatime</h2>
        <p className=' text-xl text-grayish my-4'>
          Please enter required info to sign up
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className=' space-y-2'>
          <Input
            label='Username'
            id='username'
            name='username'
            minLength={3}
            placeholder='Enter unique username'
            required={true}
            type='text'
            register={register}
            errors={errors}
            key={1}
            isDirty={dirtyFields.username}
            tip='Username should be unique, min 3 symbols'
          />
          <Input
            label='Email'
            id='email'
            name='email'
            placeholder='Enter your email'
            required={true}
            type='email'
            register={register}
            errors={errors}
            key={2}
            isDirty={dirtyFields.email}
          />
          <Input
            label='Password'
            id='password'
            name='password'
            minLength={3}
            placeholder='Fill in password'
            required={true}
            type='password'
            register={register}
            errors={errors}
            key={3}
            isDirty={dirtyFields.password}
          />
          <Input
            label='Repeat Password'
            id='password2'
            name='password2'
            minLength={3}
            placeholder='Repeat password'
            required={true}
            type='password'
            register={register}
            errors={errors}
            key={4}
            isDirty={dirtyFields.password2}
            customValidation={{
              func: passwordsMatch,
              message: 'Passwords should match',
            }}
          />
          <Button text='SIGN UP' />
        </form>
        <div className='w-full flex justify-center items-center gap-2 my-6 '>
          <p className=' text-grayish'>Already have an account?</p>
          <Link to='/login' className='font-bold'>
            Log In
          </Link>
        </div>
      </div>
      <img src={Vaccine} alt='vaccine' className=' hidden lg:block h-screen' />
    </div>
  );
};

export default Register;
