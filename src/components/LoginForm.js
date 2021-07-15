import React, { useState } from 'react';

const LoginForm = ({ handleUserLogin }) => {
  const [inputText, setInputText] = useState('');
  const [password, setPassword] = useState('');

  const handleUserNameChange = e => {
    setInputText(e.target.value);
  }

  const handlePasswordChange = e => {
    setPassword(e.target.value);
  }

  const onSubmit = e => {
    e.preventDefault();
    handleUserLogin(inputText);
    setInputText('');
    setPassword('');
  }

  return (
    <form onSubmit={e => onSubmit(e)}>
      <input className='login-input' type='text' placeholder='wuz yo name?' value={inputText} onChange={e => handleUserNameChange(e)} required />
      <input className='login-password-input' type='password' value={password} onChange={e => handlePasswordChange(e)} required />
      <input className='submit-btn' type='submit' value='Login' />
    </form>
  )
}

export default LoginForm
