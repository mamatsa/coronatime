import React from 'react';
import { Logo } from 'components/svg';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from 'components';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';

const baseURL: string =
  'https://coronatime-api.devtest.ge/api/password/send-recovery-link';

const RequestResetPassword = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, dirtyFields },
  } = useForm<{ email: string }>({
    mode: 'onChange',
    shouldUnregister: true,
  });

  const onSubmit: SubmitHandler<{ email: string }> = (data) =>
    requestPasswordRecovery(data.email);

  const navigate = useNavigate();

  const requestPasswordRecovery = (email: string) => {
    axios
      .post(baseURL, {
        email,
        backlink: `${window.location.host}/password/reset`,
      })
      .then((response) => {
        navigate('/password/pending');
      })
      .catch((error) => {
        setError('email', {
          type: 'custom',
          message: error.response.data[0].message,
        });
      });
  };

  return (
    <div className=' w-full h-screen flex flex-col items-center'>
      <Logo className=' my-10' />
      <div className='flex flex-col justify-center items-center h-3/4 gap-16'>
        <h2 className=' font-black text-[25px]'>Reset Password</h2>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
          <Input
            id='email'
            label='Email'
            name='email'
            placeholder='Enter your email'
            required={true}
            type='email'
            register={register}
            errors={errors}
            isDirty={dirtyFields.email}
          />
          <Button text='RESET PASSWORD' />
        </form>
      </div>
    </div>
  );
};

export default RequestResetPassword;
