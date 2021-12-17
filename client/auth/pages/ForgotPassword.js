import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { ApiCheck } from '../../utils/ApiCheck';
import {
  InputWithLabel,
  BigButton,
  SmallTextButton,
} from '../../utils/FormComponents';
import { Title, LoginContainer, Message } from '../../utils/LoginComponents';

export const ForgotPasswordPage = () => {
  const [errorMsg, setErrorMsg] = useState('');
  const [success, setSuccess] = useState('');
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  const onResetClicked = async () => {
    try {
      await axios.put(`/api/forgot-password/${email}`);
      setSuccess(true);
      setTimeout(() => navigate('/login'), 4000);
    } catch (e) {
      setErrorMsg(e.message);
    }
  };

  return (
    <LoginContainer>
      <ApiCheck />

      {success ? (
        <div>
          <Message success>Success!</Message>
          <Message>Check your email for a link to reset your password.</Message>
        </div>
      ) : (
        <div>
          {errorMsg && <Message error>{errorMsg}</Message>}
          <div className='space-y-6 mb-4'>
            <Message>Enter your email and we'll send you a link.</Message>

            <InputWithLabel
              label='Email'
              type='text'
              name='email'
              value={email}
              placeholder='email@gmail.com'
              onChange={(e) => setEmail(e.target.value)}
            />

            <BigButton disabled={!email} onClick={onResetClicked}>
              Send Link
            </BigButton>

            <div className='flex items-center justify-between'>
              <SmallTextButton left onClick={() => navigate('/login')}>
                Return to Login
              </SmallTextButton>

              <SmallTextButton right onClick={() => navigate('/signup')}>
                Create New Account
              </SmallTextButton>
            </div>
          </div>
        </div>
      )}
    </LoginContainer>
  );
};
