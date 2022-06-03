import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login, Register, Confirmation } from 'pages';
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
      </Routes>
    </Router>
  );
}

export default App;
