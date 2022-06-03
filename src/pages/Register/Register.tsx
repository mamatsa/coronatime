import React from 'react';
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Vaccine } from 'assets/images';
import { Logo } from 'components/svg';
import Input from 'components/Input';

type FormInputs = {
  username: string;
  email: string;
  password: string;
  password2: string;
};

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, dirtyFields },
  } = useForm<FormInputs>({
    mode: 'onChange',
    shouldUnregister: true,
    // delayError: 500,
  });

  const onSubmit: SubmitHandler<FormInputs> = (data) => console.log(data);

  const passwordsMatch = () => {
    return watch('password') === watch('password2');
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

          <button
            type='submit'
            className=' w-full bg-main-green font-black text-white py-4 rounded-lg'
          >
            SIGN UP
          </button>
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
