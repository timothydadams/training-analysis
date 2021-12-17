import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToken } from '../../auth/useToken';
import { useUser } from '../../auth/useUser';
import axios from 'axios';

export const Home = () => {
  const user = useUser();
  const [token, setToken] = useToken();

  const { id, email, info, isVerified } = user;

  const navigate = useNavigate();

  /* send post req to server
    const saveChanges = async () => {
        try {
            const response = await axios.put(`/api/users/${id}`, {
                //...objectProperties
            }, {
                headers: { Authorization: `Bearer ${token}`}
            });

            const { token: newToken } = response.data;
            setToken(newToken);
            setShowSuccessMessage(true);
        } catch (error) {
            setShowErrorMessage(true);
        }
    }
    */

  const logOut = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const updateUserInfo = () => {
    navigate('/user');
  };

  const checkScore = () => {
    navigate('/score-checker');
  };

  return (
    <div tw='grid grid-flow-row grid-cols-3 grid-rows-3 gap-4 p-4'>
      <div className='col-span-2 row-span-2 bg-indigo-100 rounded-md p-5 border-dashed border-2 border-black'>
        <h1 className='text-center text-xl font-bold mb-2'>Component 1...</h1>
      </div>

      <div className='bg-indigo-100 rounded-md p-5 border-dashed border-2 border-black'>
        <h1 className='text-center text-xl font-bold mb-2'>Component 2...</h1>
      </div>

      <div className='row-span-2 bg-indigo-100 rounded-md p-5 border-dashed border-2 border-black'>
        <h1 className='text-center text-xl font-bold mb-2'>Component 3...</h1>
      </div>

      <div className='bg-indigo-100 rounded-md p-5 border-dashed border-2 border-black'>
        <h1 className='text-center text-xl font-bold mb-2'>Component 4...</h1>
      </div>

      <div className='bg-indigo-100 rounded-md p-5 border-dashed border-2 border-black'>
        <h1 className='text-center text-xl font-bold mb-2'>Component 5...</h1>
      </div>
    </div>
  );
};
