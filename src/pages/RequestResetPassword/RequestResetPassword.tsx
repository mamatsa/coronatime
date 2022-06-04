import React from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button, Input, AuthNavbar } from 'components';

const baseURL: string =
  'https://coronatime-api.devtest.ge/api/password/send-recovery-link';

const RequestResetPassword = () => {
  const { t } = useTranslation();

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
          message: 'errors.unknown_email',
        });
      });
  };

  return (
    <div className=' w-full h-screen flex flex-col items-center py-10 px-5'>
      <AuthNavbar />
      <div className='flex flex-col justify-center items-center h-3/4 gap-16'>
        <h2 className=' font-black text-[25px]'>{t('reset_password.title')}</h2>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
          <Input
            id='email'
            label={t('email')}
            name='email'
            placeholder={t('email_placeholder')}
            required={true}
            type='email'
            register={register}
            errors={errors}
            isDirty={dirtyFields.email}
          />
          <Button text={t('reset_password.button_text')} />
        </form>
      </div>
    </div>
  );
};

export default RequestResetPassword;
