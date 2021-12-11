import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ApiCheck } from '../components/ApiCheck';
import { InputWithLabel, BigButton, SmallTextButton } from '../components/FormComponents';
import { Title, LoginContainer, Message } from '../components/LoginComponents';



const Success = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Message success>Your password has been reset!</Message>
            <Message>Please login with your new password.</Message>
            <BigButton onClick={() => navigate('/login')}>
                Return To Login
            </BigButton>
        </div>
    )
}

const Fail = () => (
    <Message error>Something went wrong while resetting your password...</Message>
)


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
        <LoginContainer>
            <ApiCheck />

            {isSuccess ? (
                <Success />
            ) : (
                <div>
                    <Message>Please update your password</Message>

                    { isFail && <Fail />}

                    <InputWithLabel label="New Password"
                        type="password"
                        name="password"
                        value={password}
                        placeholder="password"
                        onChange={e => setPassword(e.target.value)} />

                    <InputWithLabel label="Confirm Password"
                        type="password"
                        name="verifyPW"
                        value={verifyPassword}
                        placeholder="confirm password"
                        onChange={e => setVerifyPassword(e.target.value)} />


                    <BigButton
                        disabled={
                            !password || !verifyPassword ||
                            password !== verifyPassword
                        }
                        onClick={onResetPassword}>
                            Reset Password
                    </BigButton>
                </div>
            )}  
    
        </LoginContainer>
    )
}