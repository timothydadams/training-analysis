import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ApiCheck } from '../components/ApiCheck';




const Success = () => {
    const navigate = useNavigate();

    return (
        <div>
            <p className="text-center font-bold mb-2 text-green-600">Your password has been reset!</p>
            <p>Please login with your new password.</p>
            <button 
                onClick={() => navigate('/login')}
                className="w-full bg-indigo-600 disabled:opacity-50 hover:bg-indigo-700 text-white font-bold py-2 px-4 mb-6 rounded"
                >
                    Return To Login
            </button>
        </div>
    )
}

const Fail = () => {
    const navigate = useNavigate();
    return (
        <div>
            <p className="text-red-400">Something went wrong while resetting your password...</p>
            <p className="mb-4">Change your password below</p>
            <button 
                onClick={() => navigate('/login')}
                className="w-full bg-indigo-600 disabled:opacity-50 hover:bg-indigo-700 text-white font-bold py-2 px-4 mb-6 rounded"
                >
                    Return To Login
            </button>
        </div>
    )
}

export const ResetPasswordLandingPage = () => {
    const [isFail, setIsFail] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [password, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');

    const { resetCode } = useParams();

    const onResetPassword = async () => {
        try {
            await axios.put(`/api/users/${resetCode}/reset-password`, { newPassword: password});
            setIsSuccess(true);
            //setTimeout(()=>navigate('/login'), 3000);
        } catch(e){
            setIsFail(true);
        }
    }


    return (
    <div className="flex flex-col h-screen">
        <div className="max-w-lg w-full m-auto bg-indigo-100 rounded-md p-5">   
            <ApiCheck />


        {isSuccess ? (
            <Success />
        ) : isFail ? (
            <Fail />
        ) : (
            <div>
            <p className="mb-4">Please update your password</p>
            <label className="block mb-2 text-black" htmlFor="password">New Password</label>
            <input className="w-full p-2 mb-6 text-black border-b-2 border-black outline-none bg-indigo-100"
                type="password"
                name="password"
                value={password}
                placeholder="password"
                onChange={e => setPassword(e.target.value)} />



            <label className="block mb-2 text-black" htmlFor="verifyPW">Re-type Password</label>
            <input className="w-full p-2 mb-6 text-black border-b-2 border-black outline-none bg-indigo-100"
                type="password"
                name="verifyPW"
                value={verifyPassword}
                placeholder="confirm password"
                onChange={e => setVerifyPassword(e.target.value)} />


            <button 
                disabled={
                    !password || !verifyPassword ||
                    password !== verifyPassword
                }
                onClick={onResetPassword}
                className="w-full bg-indigo-600 disabled:opacity-50 hover:bg-indigo-700 text-white font-bold py-2 px-4 mb-6 rounded"
                >
                    Reset Password
            </button>
            </div>
        )}  
    
        
    </div>
    </div>
    )
}