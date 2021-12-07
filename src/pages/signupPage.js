import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { useToken } from '../auth/useToken';
import Button from '../components/Buttons';
import axios from 'axios';
import { ApiCheck } from '../components/ApiCheck';
//import tw from 'twin.macro';

export const SignupPage = () => {
    const [token, setToken] = useToken();

    const [errorMsg, setErrorMsg] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();

    const onSignUpClicked = async () => {
        const response = await axios.post('/api/signup', {
            email,
            password,
        });

        const {token} = response.data;
        setToken(token);
        navigate('/please-verify');
    }

    return (
        <div className="flex flex-col h-screen">
            <div className="max-w-xs w-full m-auto bg-indigo-100 rounded-md p-5">   
                <ApiCheck />

            <p className="text-center text-xl font-bold mb-2">Create A New Account</p>
            {errorMsg && <div className="fail">{errorMsg}</div>}

            <label className="block mb-2 text-black" htmlFor="email">Email</label>
            <input className="w-full p-2 mb-6 text-black border-b-2 border-black outline-none bg-indigo-100"
                 type="email"
                 name="email"
                value={email} 
                placeholder="someone@gmail.com"
                onChange={e => setEmail(e.target.value)} />


            <label className="block mb-2 text-black" htmlFor="password">Password</label>
            <input className="w-full p-2 mb-6 text-black border-b-2 border-black outline-none bg-indigo-100"
                type="password"
                name="password"
                value={password}
                placeholder="password"
                onChange={e => setPassword(e.target.value)} />



            <label className="block mb-2 text-black" htmlFor="confirmPW">Retype Password</label>
            <input className="w-full p-2 mb-6 text-black border-b-2 border-black outline-none bg-indigo-100"
                type="password"
                name="confirmPW"
                value={confirmPassword}
                placeholder="confirm password"
                onChange={e => setConfirmPassword(e.target.value)} />

            <button 
                disabled={
                    !email || !password ||
                    password !== confirmPassword
                }
                onClick={onSignUpClicked}
                className="w-full bg-indigo-600 disabled:opacity-50 hover:bg-indigo-700 text-white font-bold py-2 px-4 mb-6 rounded"
                >
                    Sign Up!
                    </button>
            
            <button 
                onClick={() => navigate('/login')} 
                className="text-indigo-800 hover:text-black text-sm float-left duration-300"
                >
                    I already have an account
                </button>
        </div>
        </div>
    )
}