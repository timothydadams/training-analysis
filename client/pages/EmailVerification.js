import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useToken } from '../auth/useToken';
//import tw, { styled } from 'twin.macro'

//const PrimaryButton = tw.button`bg-blue-800 text-white px-6 py-2 m-6 rounded-md hover:bg-blue-600`; 

const EmailVerificationSuccess = () => {
    const navigate = useNavigate();
    return (
        <div>
            <h1 className="text-center text-xl font-bold mb-2">Success!</h1>
            <p className="mb-4">Thanks for verifying your email, all features are now available.</p>
            <button 
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 mb-6 rounded"
                onClick={() => navigate('/user')} >Continue</button>
                
        </div>
    )
}


const EmailVerificationFail = () => {
    const navigate = useNavigate();
    return (
        <div>
            <h1 className="text-center text-xl font-bold mb-2">Uh oh...</h1>
            <p className="mb-4">Something went wrong.</p>
            <button 
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 mb-6 rounded"
                onClick={() => navigate('/signup')} >Back to Sign Up</button>
        </div>
    )
}




export const EmailVerificationLandingPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isSuccess, setIsSuccess] = useState(false);
    const { verificationString } = useParams();
    const [, setToken] = useToken();

    useEffect(()=>{
        const loadVerification = async () => {
            try {
                const response = await axios.put('/api/verify-email',{verificationString});
                const { token } = response.data;
                setToken(token);
                setIsSuccess(true);
                setIsLoading(false);
            } catch (e) {
                setIsSuccess(false);
                setIsLoading(false);
            }
        }
        loadVerification();
    }, [setToken, verificationString]);


    return (
        <div className="flex flex-col h-screen">
            <div className="max-w-xs w-full m-auto bg-indigo-100 rounded-md p-5">
            {isLoading 
            ? (<p>Loading</p>)
            : !isSuccess 
                ? <EmailVerificationFail />
                : <EmailVerificationSuccess />
            }
            </div>
        </div>
    )
}