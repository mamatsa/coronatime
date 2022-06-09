import React from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Input, Button, AuthNavbar } from 'components';
import { Vaccine } from 'assets/images';
import { baseURL } from 'services';

type FormInputs = {
  username: string;
  email: string;
  password: string;
  password2: string;
};

const Register = () => {
  const { t } = useTranslation();

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
      .post(baseURL + '/register', {
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
        const errorTarget = error.response.data[0].context.label;
        setError(errorTarget, {
          type: 'custom',
          message:
            errorTarget === 'email'
              ? 'errors.email_taken'
              : 'errors.username_taken',
        });
      });
  };

  return (
    <div className=' flex flex-row justify-between'>
      <div className=' px-5 md:px-28 py-10 w-full md:w-3/4 2xl:w-2/5 '>
        <AuthNavbar />
        <h2 className=' font-black text-2xl mt-16' id='registerWelcome'>
          {t('register.welcome')}
        </h2>
        <p className=' text-xl text-grayish my-4'>{t('register.enter_info')}</p>
        <form onSubmit={handleSubmit(onSubmit)} className=' space-y-2'>
          <Input
            label={t('username')}
            id='username'
            name='username'
            minLength={3}
            placeholder={t('register.username_placeholder')}
            required={true}
            type='text'
            register={register}
            errors={errors}
            key={1}
            isDirty={dirtyFields.username}
            tip={t('register.username_format')}
          />
          <Input
            label={t('email')}
            id='email'
            name='email'
            placeholder={t('email')}
            required={true}
            type='email'
            register={register}
            errors={errors}
            key={2}
            isDirty={dirtyFields.email}
          />
          <Input
            label={t('password')}
            id='password'
            name='password'
            minLength={3}
            placeholder={t('password_placeholder')}
            required={true}
            type='password'
            register={register}
            errors={errors}
            key={3}
            isDirty={dirtyFields.password}
          />
          <Input
            label={t('repeat_password')}
            id='password2'
            name='password2'
            minLength={3}
            placeholder={t('repeat_password')}
            required={true}
            type='password'
            register={register}
            errors={errors}
            key={4}
            isDirty={dirtyFields.password2}
            customValidation={{
              func: passwordsMatch,
              message: t('passwords_should_match'),
            }}
          />
          <Button text={t('sign_up')} id='registerSubmit' />
        </form>
        <div className='w-full flex justify-center items-center gap-2 my-6 '>
          <p className=' text-grayish'>{t('register.already_have_account')}</p>
          <Link to='/login' className='font-bold' id='registerToLoginLink'>
            {t('log_in')}
          </Link>
        </div>
      </div>
      <img src={Vaccine} alt='vaccine' className=' hidden xl:block h-screen' />
    </div>
  );
};

export default Register;
