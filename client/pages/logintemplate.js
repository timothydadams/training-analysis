import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { useUser } from '../auth/useUser';
import { useToken } from '../auth/useToken';
import axios from 'axios';
import { ApiCheck } from '../components/ApiCheck';
import { InputWithLabel, BigButton, SmallTextButton } from '../components/FormComponents';
import { Title, LoginContainer, Message } from '../components/LoginComponents';

export const TemplatePage = () => {
    const [token, setToken] = useToken();
    const [user, setUser] = useUser();
    const navigate = useNavigate();


    return (
        <LoginContainer>

            <ApiCheck />

            <Title>Page Title</Title>

            <Message>Just a note here</Message>

            <InputWithLabel label="Email"
                type="email"
                name="email"
                value={email} 
                placeholder="someone@gmail.com"
                onChange={e => setEmail(e.target.value)} />


            <BigButton 
                disabled={!email}
                onClick={onSignUpClicked}
            >
                Sign Up!
            </BigButton>
            
            <SmallTextButton left onClick={() => navigate('/login')}>
                I already have an account
            </SmallTextButton>

        </LoginContainer>
    )
}