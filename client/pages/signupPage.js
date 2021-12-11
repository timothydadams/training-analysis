import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { useToken } from '../auth/useToken';
import axios from 'axios';
import { ApiCheck } from '../components/ApiCheck';
import { InputWithLabel, BigButton, SmallTextButton } from '../components/FormComponents';
import { Title, LoginContainer, Message } from '../components/LoginComponents';

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
        <LoginContainer>

            <ApiCheck />

            <Title>Create A New Account</Title>

            {errorMsg && <Message error>{errorMsg}</Message>}

            <InputWithLabel label="Email"
                type="email"
                name="email"
                value={email} 
                placeholder="someone@gmail.com"
                onChange={e => setEmail(e.target.value)} 
            />

            <InputWithLabel label="Password"
                type="password"
                name="password"
                value={password}
                placeholder="password"
                onChange={e => setPassword(e.target.value)} />

            <InputWithLabel label="Confirm Password"
                type="password"
                name="confirmPW"
                value={confirmPassword}
                placeholder="confirm password"
                onChange={e => setConfirmPassword(e.target.value)} 
            />

            <BigButton onClick={onSignUpClicked}
                disabled={
                    !email || !password ||
                    password !== confirmPassword
                }
            >
                Sign Up!
            </BigButton>
            
            <SmallTextButton left onClick={() => navigate('/login')} >
                    I already have an account
            </SmallTextButton>

        </LoginContainer> 
    )
}