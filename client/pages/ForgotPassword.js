import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { ApiCheck } from '../components/ApiCheck';

export const ForgotPasswordPage = () => {
    const [errorMsg, setErrorMsg] = useState('');
    const [success, setSuccess] = useState('');
    const [email, setEmail] = useState('');

    const navigate = useNavigate();

    const onResetClicked = async () => {
        try {
            await axios.put(`/api/forgot-password/${email}`);
            setSuccess(true);
            setTimeout(()=>navigate('/login'), 3000);
        } catch(e){
            setErrorMsg(e.message);
        }
    }


    return (
    <div className="flex flex-col h-screen">
        <div className="max-w-lg w-full m-auto bg-indigo-100 rounded-md p-5">   
            <ApiCheck />
            {success ? (
            <div>
                <p className="text-center font-bold mb-2 text-green-600">Success!</p>
                <p>Check your email for a link to reset your password.</p>
            </div>
        ):(
            <div>
                {errorMsg && <p className="text-red-400">{errorMsg}</p>}
                <p className="mb-4">Enter your email and we'll send you a link.</p>

                <input className="w-full p-2 mb-6 text-black border-b-2 border-black outline-none bg-indigo-100" 
                    type="text" 
                    name="email" 
                    value={email} 
                    placeholder="email@gmail.com"
                    onChange={e => setEmail(e.target.value)} 
                />
            </div>
        )}

            <button 
                disabled={!email} 
                onClick={onResetClicked} 
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 mb-6 rounded" 
            >
                Send Link
            </button>

            <button
                className="text-indigo-800 hover:text-black text-sm float-left duration-300" 
                onClick={()=>navigate('/login')}
                >
                    Log In
            </button>
            <button 
                className="text-indigo-800 hover:text-black text-sm float-right duration-300" 
                onClick={()=> navigate('/signup')}
                >
                    Create New Account</button>    
    
        
    </div>
    </div>
    )
}