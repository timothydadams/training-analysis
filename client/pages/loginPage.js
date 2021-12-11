import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToken } from '../auth/useToken';
import axios from 'axios';
import { ApiCheck } from '../components/ApiCheck';
import { InputWithLabel, BigButton, SmallTextButton } from '../components/FormComponents';
import { Title, LoginContainer, Message } from '../components/LoginComponents';

export const LoginPage = () => {
    const [token, setToken] = useToken();
    const [errorMsg, setErrorMsg] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const {state} = useLocation();

    const onLoginClicked = async () => {
        const response = await axios.post('/api/login', {
            email,
            password,
        });
        const {token} = response.data;
        setToken(token);
        navigate(state ? state.path : '/');
    }

    return (
        <LoginContainer>
            <ApiCheck />

            {errorMsg && <Message error>{errorMsg}</Message>}

            <Title>Login Required</Title>
           
                
            <InputWithLabel label="Email"
                type="text" 
                name="email" 
                value={email} 
                placeholder="email@gmail.com"
                onChange={e => setEmail(e.target.value)} 
            />
           
         
            <InputWithLabel label="Password"
                type="password" 
                name="password" 
                value={password}
                placeholder="password"
                onChange={e => setPassword(e.target.value)}
            />
    
            <BigButton
                disabled={!email || !password} 
                onClick={onLoginClicked}
            >
                Login
            </BigButton>       
                
            <SmallTextButton left onClick={()=>navigate('/forgot-password')}>
                Forgot Password?
            </SmallTextButton>

            <SmallTextButton right onClick={()=> navigate('/signup')}>
                Create Account
            </SmallTextButton>
        
        </LoginContainer>
    )
}