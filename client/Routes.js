import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserInfoPage } from './pages/UserInfoPage';
import { LoginPage } from './pages/loginPage';
import { SignupPage } from './pages/signupPage';
import { VerifyEmail } from './pages/VerifyEmail';
import { EmailVerificationLandingPage } from './pages/EmailVerification';
import { AuthRequired } from './auth/AuthRequired';
import { AcftPage } from './pages/CheckAcftPage';
import { Dashboard } from './pages/Dashboard';

export const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={
                    <AuthRequired>
                        <Dashboard />
                    </AuthRequired>} />
                <Route path="/score-checker" element={
                    <AuthRequired>
                        <AcftPage />
                    </AuthRequired>} />
                <Route path="/user" element={
                    <AuthRequired>
                        <UserInfoPage />
                    </AuthRequired>} />
                
                <Route path="/please-verify" element={<VerifyEmail />} />
                <Route path="/verify-email/:verificationString" element={<EmailVerificationLandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
            </Routes>
        </Router>
    );
}