export type RecoverPasswordForm = { password: string; password2: string };

export type LoginForm = {
  username: string;
  password: string;
  remember: string;
};

export type RegisterForm = {
  username: string;
  email: string;
  password: string;
  password2: string;
};

export type EmailForm = { email: string };

export type LoginComponent = {
  onLogin: (userToken: string, userName: string) => void;
};
