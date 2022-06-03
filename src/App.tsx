import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  Login,
  Register,
  Confirmation,
  RequestResetPassword,
  ResetPassword,
} from 'pages';
import { Button } from 'components';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        <Route
          path='/register/confirm/*'
          element={<Confirmation text='We have sent you confirmation email' />}
        >
          <Route path='success' element={<Button text='SIGN IN' />} />
        </Route>

        <Route path='/password' element={<RequestResetPassword />} />
        <Route path='/password/reset' element={<ResetPassword />} />
        <Route
          path='/password/pending/*'
          element={
            <Confirmation text='We have sent you a confirmation email' />
          }
        >
          <Route path='success' element={<Button text='SIGN IN' />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
