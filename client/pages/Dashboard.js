import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToken } from '../auth/useToken';
import { useUser } from '../auth/useUser';
import axios from 'axios';

export const Dashboard = () => {
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
    }
    
    const updateUserInfo = () => {
        navigate('/user');
    }

    const checkScore = () => {
        navigate('/score-checker');
    }
    
    // And here we have the JSX for our component. It's pretty straightforward
    return (
        <div className="flex flex-col h-screen">
            <div className="max-w-2xl w-full m-auto bg-indigo-100 rounded-md p-5">
                <h1 className="text-center text-xl font-bold mb-2">
                    Future Dashboard Component
                </h1>
               
                

                
                    <button  
                        onClick={checkScore} 
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 mb-6 rounded" 
                    >
                    Check ACFT Score
                    </button>       
                
                
                    <button
                        className="text-indigo-800 hover:text-black text-sm float-left duration-300" 
                        onClick={updateUserInfo}
                    >
                        Update My Info
                    </button>   
                

                 
                    <button
                        className="text-indigo-800 hover:text-black text-sm float-right duration-300" 
                        onClick={logOut}
                    >
                        Log Out
                    </button>   
                
                

            </div> 
        </div>


    );
}