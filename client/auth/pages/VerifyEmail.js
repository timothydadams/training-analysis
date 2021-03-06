import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, BigButton, SmallTextButton } from '../../utils/FormComponents';
import { Title, LoginContainer, Message } from '../../utils/LoginComponents';

export const VerifyEmail = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/');
    }, 4000);
  }, [navigate]);

  return (
    <LoginContainer>
      <Title>Verification Needed</Title>
      <Message center>Please check your email and verify your account.</Message>
    </LoginContainer>
  );
};
