import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Login,
  Register,
  Confirmation,
  RequestResetPassword,
  ResetPassword,
  Dashboard,
  NotFound,
} from 'pages';
import { Button } from 'components';

function App() {
  const { t } = useTranslation();

  const [token, setToken] = useState<string | null>();
  const [user, setUser] = useState<string | null>('');

  useEffect(() => {
    setToken(localStorage.getItem('userToken'));
    setUser(localStorage.getItem('userName'));
  }, []);

  const loginHandler = (userToken: string, userName: string) => {
    setToken(userToken);
    setUser(userName);
    localStorage.setItem('userToken', userToken);
    localStorage.setItem('userName', userName);
  };

  const logoutHandler = () => {
    setToken('');
    setUser('');
    localStorage.clear();
  };

  return (
    <Router>
      <Routes>
        {token ? (
          <>
            <Route
              path='/'
              element={
                <Dashboard
                  username={user}
                  token={token}
                  onLogout={logoutHandler}
                />
              }
            />
            <Route
              path='/login'
              element={
                <Dashboard
                  username={user}
                  token={token}
                  onLogout={logoutHandler}
                />
              }
            />
            <Route
              path='/by-country'
              element={
                <Dashboard
                  token={token}
                  username={user}
                  onLogout={logoutHandler}
                />
              }
            />
          </>
        ) : (
          <>
            <Route path='/login' element={<Login onLogin={loginHandler} />} />{' '}
            <Route path='/' element={<Login onLogin={loginHandler} />} />
            <Route path='/register' element={<Register />} />
            <Route
              path='/register/confirm/*'
              element={<Confirmation text='pending.email_sent' />}
            >
              <Route
                path='success'
                element={<Button text={t('sign_in')} id='confirmButton' />}
              />
            </Route>
            <Route path='/password' element={<RequestResetPassword />} />
            <Route path='/password/reset' element={<ResetPassword />} />
            <Route
              path='/password/pending/*'
              element={<Confirmation text='pending.email_sent' />}
            >
              <Route
                path='success'
                element={<Button text={t('sign_in')} id='confirmButton' />}
              />
            </Route>
          </>
        )}
        <Route path='*' element={<NotFound isLoggedIn={!!token} />} />
      </Routes>
    </Router>
  );
}

export default App;
