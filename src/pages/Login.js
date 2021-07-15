import React from 'react';
import LoginForm from '../components/LoginForm';

const Login = ({ handleUserLogin }) => {

  return (
    <div>
      <LoginForm handleUserLogin={handleUserLogin} />
    </div>
  )
}

export default Login
