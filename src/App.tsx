import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Login,
  Register,
  Confirmation,
  RequestResetPassword,
  ResetPassword,
} from 'pages';
import { Button } from 'components';

function App() {
  const { t } = useTranslation();

  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        <Route
          path='/register/confirm/*'
          element={<Confirmation text='pending.email_sent' />}
        >
          <Route path='success' element={<Button text={t('sign_in')} />} />
        </Route>

        <Route path='/password' element={<RequestResetPassword />} />
        <Route path='/password/reset' element={<ResetPassword />} />
        <Route
          path='/password/pending/*'
          element={<Confirmation text='pending.email_sent' />}
        >
          <Route path='success' element={<Button text={t('sign_in')} />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
