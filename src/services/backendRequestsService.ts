import { axiosInstance } from 'services';

export const loginRequest = async (username: string, password: string) => {
  const res = await axiosInstance.post('/login', {
    username,
    password,
  });

  return res.data.token;
};

export const registerRequest = async (
  username: string,
  email: string,
  password: string,
  repeatPassword: string
) => {
  await axiosInstance.post('/register', {
    username,
    email,
    password,
    repeatPassword,
    redirectOnConfirm: `http://${window.location.host}/register/confirm/success`,
  });
};

export const emailConfirmRequest = async (hash: string | null) => {
  await axiosInstance.post('/confirm-account', {
    hash,
  });
};

export const passwordRecoveryLinkRequest = async (email: string) => {
  await axiosInstance.post('/password/send-recovery-link', {
    email,
    backlink: `http://${window.location.host}/password/reset`,
  });
};

export const passwordRecoveryRequest = async (
  password: string,
  repeatPassword: string,
  hash: string | null
) => {
  await axiosInstance.post('/password/recover', {
    password,
    repeatPassword,
    hash,
  });
};

export const countryRequest = async (token: string) => {
  const res = await axiosInstance.get('/countries', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${token}`,
    },
  });

  return res.data;
};
