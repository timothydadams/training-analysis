import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserInfoPage } from './pages/UserInfoPage';
import { LoginPage } from './pages/loginPage';
import { SignupPage } from './pages/signupPage';
import { VerifyEmail } from './pages/VerifyEmail';
import { EmailVerificationLandingPage } from './pages/EmailVerification';
import { PrivateOutlet } from './auth/PrivateRoute';
import { AcftPage } from './pages/CheckAcftPage';

export const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<PrivateOutlet />} >
                    <Route path="/score-checker" element={<AcftPage />} />
                    <Route path="" element={<UserInfoPage />} />
                </Route>
                <Route path="/please-verify" element={<VerifyEmail />} />
                <Route path="/verify-email/:verificationString" element={<EmailVerificationLandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
            </Routes>
        </Router>
    );
}