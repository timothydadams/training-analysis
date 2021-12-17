import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../useUser';
import { useToken } from '../useToken';
import axios from 'axios';
import { ApiCheck } from '../../utils/ApiCheck';
import {
  InputWithLabel,
  BigButton,
  SmallTextButton,
} from '../../utils/FormComponents';
import { Title, LoginContainer, Message } from '../../utils/LoginComponents';

export const TemplatePage = () => {
  const [token, setToken] = useToken();
  const [user, setUser] = useUser();
  const navigate = useNavigate();

  return (
    <LoginContainer>
      <ApiCheck />

      <Title>Page Title</Title>

      <Message>Just a note here</Message>

      <InputWithLabel
        label='Email'
        type='email'
        name='email'
        value={email}
        placeholder='someone@gmail.com'
        onChange={(e) => setEmail(e.target.value)}
      />

      <BigButton disabled={!email} onClick={onSignUpClicked}>
        Sign Up!
      </BigButton>

      <SmallTextButton left onClick={() => navigate('/login')}>
        I already have an account
      </SmallTextButton>
    </LoginContainer>
  );
};
