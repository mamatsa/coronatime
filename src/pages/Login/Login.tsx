import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Vaccine } from 'assets/images';
import { Logo } from 'components/svg';
import { Input, Button } from 'components';
import axios from 'axios';

const baseURL: string = 'https://coronatime-api.devtest.ge/api/login';

type FormInputs = {
  username: string;
  password: string;
  remember: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, dirtyFields },
  } = useForm<FormInputs>({
    mode: 'onChange',
    shouldUnregister: true,
  });

  const navigate = useNavigate();

  const loginUser = (username: string, password: string) => {
    axios
      .post(baseURL, {
        username,
        password,
      })
      .then((response) => {
        const token: string = response.data.token;
        localStorage.setItem('userToken', token);
        navigate('/');
      })
      .catch((error) => {
        const response = error.response;
        if (response.status === 422) {
          setError('username', {
            type: 'custom',
            message: response.data[0].message,
          });
        } else if (response.status === 401) {
          setError('password', {
            type: 'custom',
            message: response.data.message,
          });
        }
      });
  };

  const onSubmit: SubmitHandler<FormInputs> = (data) =>
    loginUser(data.username, data.password);

  return (
    <div className=' flex flex-row justify-between'>
      <div className=' px-5 md:px-28 py-10 '>
        <Logo />
        <h2 className=' font-black text-2xl mt-16'>Welcome back</h2>
        <p className=' text-xl text-grayish my-4'>
          Welcome back! Please enter your details
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label='Username'
            id='username'
            name='username'
            minLength={3}
            placeholder='Enter unique username or email'
            required={true}
            type='text'
            register={register}
            errors={errors}
            key={1}
            isDirty={dirtyFields.username}
          />
          <Input
            label='Password'
            id='password'
            name='password'
            placeholder='Fill in password'
            required={true}
            type='password'
            register={register}
            errors={errors}
            key={2}
            isDirty={dirtyFields.password}
          />
          <div className=' flex justify-between mb-6'>
            <div className=' flex items-center'>
              <input
                type='checkbox'
                id='remember'
                value={'remembered'}
                {...register('remember')}
                className='w-4 h-4 accent-green-600'
              />
              <label htmlFor='remember' className=' text-sm font-semibold ml-2'>
                Remember this device{' '}
              </label>
            </div>
            <Link
              to='/reset-password'
              className=' text-sm text-main-blue font-semibold'
            >
              Forgot password?
            </Link>
          </div>
          <Button text='LOG IN' />
        </form>
        <div className='w-full flex justify-center items-center gap-2 my-6 '>
          <p className=' text-grayish'>Don't have an account?</p>
          <Link to='/register' className='font-bold'>
            Sign up for free
          </Link>
        </div>
      </div>
      <img src={Vaccine} alt='vaccine' className=' hidden lg:block h-screen' />
    </div>
  );
};

export default Login;
