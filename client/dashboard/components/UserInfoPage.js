import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToken } from '../../auth/useToken';
import { useUser } from '../../auth/useUser';
import axios from 'axios';
import {
  InputWithLabel,
  BigButton,
  SmallTextButton,
} from '../../utils/FormComponents';
import { Title, LoginContainer, Message } from '../../utils/LoginComponents';

export const UserInfoPage = () => {
  const user = useUser();
  const [token, setToken] = useToken();

  const { id, email, info, isVerified } = user;

  const navigate = useNavigate();

  //form input state controls for user values
  const [favoriteFood, setFavoriteFood] = useState(info.favoriteFood || '');
  const [hairColor, setHairColor] = useState(info.hairColor || '');
  const [bio, setBio] = useState(info.bio || '');
  const [testInput, setTestInput] = useState('');

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  useEffect(() => {
    if (showSuccessMessage || showErrorMessage) {
      setTimeout(() => {
        setShowSuccessMessage(false);
        setShowErrorMessage(false);
      }, 3000);
    }
  }, [showSuccessMessage, showErrorMessage]);

  const saveChanges = async () => {
    try {
      const response = await axios.put(
        `/api/users/${id}`,
        {
          favoriteFood,
          hairColor,
          bio,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const { token: newToken } = response.data;
      setToken(newToken);
      setShowSuccessMessage(true);
    } catch (error) {
      setShowErrorMessage(true);
    }
  };

  const logOut = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const resetValues = () => {
    setFavoriteFood(info.favoriteFood);
    setHairColor(info.hairColor);
    setBio(info.bio);
    setTestInput('');
  };

  return (
    <LoginContainer>
      <Title>Update User Information</Title>

      {!isVerified && (
        <Message error>
          You won't be able to change any data until you verify your email.
        </Message>
      )}
      {showSuccessMessage && (
        <Message success>Successfully saved user data!</Message>
      )}
      {showErrorMessage && (
        <Message error>
          Uh oh... something went wrong and we couldn't save changes
        </Message>
      )}

      <div className='space-y-6 mb-4'>
        <InputWithLabel
          label='Testing'
          type='text'
          name='test'
          value={testInput}
          placeholder='more tests'
          onChange={(e) => setTestInput(e.target.value)}
        />

        <InputWithLabel
          label='Favorite Food'
          type='text'
          name='favoriteFood'
          value={favoriteFood}
          placeholder='steak'
          onChange={(e) => setFavoriteFood(e.target.value)}
        />

        <InputWithLabel
          label='Hair Color'
          type='text'
          name='hairColor'
          value={hairColor}
          placeholder='brown'
          onChange={(e) => setHairColor(e.target.value)}
        />

        <InputWithLabel
          label='Bio'
          type='text'
          name='bio'
          value={bio}
          placeholder='keep it short and sweet'
          onChange={(e) => setBio(e.target.value)}
        />

        <BigButton disabled={!isVerified} onClick={saveChanges}>
          Save Changes
        </BigButton>

        <SmallTextButton left onClick={resetValues}>
          Reset Values
        </SmallTextButton>
      </div>
    </LoginContainer>
  );
};
