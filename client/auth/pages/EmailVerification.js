import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useToken } from '../useToken';
import {
  InputField,
  BigButton,
  SmallTextButton,
} from '../../utils/FormComponents';
import { Title, LoginContainer, Message } from '../../utils/LoginComponents';

const EmailVerificationSuccess = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Title>Success!</Title>
      <Message>
        Thanks for verifying your email, all features are now available.
      </Message>
      <BigButton onClick={() => navigate('/')}>Continue</BigButton>
    </div>
  );
};

const EmailVerificationFail = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Title>Uh oh...</Title>
      <Message>Something went wrong.</Message>
      <BigButton onClick={() => navigate('/signup')}>Back to Sign Up</BigButton>
    </div>
  );
};

export const EmailVerificationLandingPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const { verificationString } = useParams();
  const [, setToken] = useToken();

  useEffect(() => {
    const loadVerification = async () => {
      try {
        const response = await axios.put('/api/verify-email', {
          verificationString,
        });
        const { token } = response.data;
        setToken(token);
        setIsSuccess(true);
        setIsLoading(false);
      } catch (e) {
        setIsSuccess(false);
        setIsLoading(false);
      }
    };
    loadVerification();
  }, [setToken, verificationString]);

  return (
    <LoginContainer>
      {isLoading ? (
        <Message>Loading</Message>
      ) : !isSuccess ? (
        <EmailVerificationFail />
      ) : (
        <EmailVerificationSuccess />
      )}
    </LoginContainer>
  );
};
