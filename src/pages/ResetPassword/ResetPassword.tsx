import React from 'react';
import { Logo } from 'components/svg';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Input } from 'components';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';

const baseURL: string =
  'https://coronatime-api.devtest.ge/api/password/recover';

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, dirtyFields },
  } = useForm<{ password: string; password2: string }>({
    mode: 'onChange',
    shouldUnregister: true,
  });

  const onSubmit: SubmitHandler<{ password: string; password2: string }> = (
    data
  ) => recoverPassword(data.password, data.password2);

  const passwordsMatch = () => {
    return watch('password') === watch('password2');
  };

  const navigate = useNavigate();
  const location = useLocation();

  const recoverPassword = (password: string, repeatPassword: string) => {
    const queryParams = new URLSearchParams(location.search);
    const hash = queryParams.get('hash');
    if (!hash) {
      navigate('/login');
    }
    axios
      .post(baseURL, {
        password,
        repeatPassword,
        hash,
      })
      .then((response) => {
        navigate('/password/pending/success');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className=' w-full h-screen flex flex-col items-center'>
      <Logo className=' my-10' />
      <div className='flex flex-col justify-center items-center h-3/4 gap-16'>
        <h2 className=' font-black text-[25px]'>Reset Password</h2>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
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
          <Button text='RESET PASSWORD' />
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
