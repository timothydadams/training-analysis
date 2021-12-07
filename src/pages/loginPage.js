import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToken } from '../auth/useToken';
//import Button from '../components/Buttons';
import axios from 'axios';
import { ApiCheck } from '../components/ApiCheck';
//import tw from 'twin.macro';

export const LoginPage = () => {
    const [token, setToken] = useToken();
    const [errorMsg, setErrorMsg] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const onLoginClicked = async () => {
        const response = await axios.post('/api/login', {
            email,
            password,
        });
        const {token} = response.data;
        setToken(token);
        navigate('/');
    }

    const btnClass = "bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mt-1 mb-1";

    return (
        <div className="flex flex-col h-screen">
        <div className="max-w-xs w-full m-auto bg-indigo-100 rounded-md p-5">   
       <ApiCheck />
        {/*<header>
             <img className="w-20 mx-auto mb-5" src="https://img.icons8.com/fluent/344/year-of-tiger.png" /> 
        </header>*/}
      
        {errorMsg && <div className="fail">{errorMsg}</div>}
        <p className="text-center text-xl font-bold mb-2">Please Sign In</p>
            <div>
                <label className="block mb-2 text-black" htmlFor="email">Email</label>
                <input className="w-full p-2 mb-6 text-black border-b-2 border-black outline-none bg-indigo-100" 
                    type="text" 
                    name="email" 
                    value={email} 
                    placeholder="email@gmail.com"
                    onChange={e => setEmail(e.target.value)} 
                />
            </div>
            <div>
                <label className="block mb-2 text-black" htmlFor="password">Password</label>
                <input className="w-full p-2 mb-6 text-black border-b-2 border-black outline-none bg-indigo-100" 
                    type="password" 
                    name="password" 
                    value={password}
                    placeholder="password"
                    onChange={e => setPassword(e.target.value)}
                />
            </div>
            <div>   
            <button 
                disabled={!email || !password} 
                onClick={onLoginClicked} 
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 mb-6 rounded" 
            >
                Login
                </button>       
                
            </div>       
        
  
        
            <button
                className="text-indigo-800 hover:text-black text-sm float-left duration-300" 
                onClick={()=>{}}
                >
                    Reset Password?
            </button>
            <button 
                className="text-indigo-800 hover:text-black text-sm float-right duration-300" 
                onClick={()=> navigate('/signup')}
                >
                    Create Account</button>
        
    </div>
    </div>
    )
}