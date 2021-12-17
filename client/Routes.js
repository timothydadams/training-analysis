import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserInfoPage } from './dashboard/components/UserInfoPage';
import { LoginPage } from './auth/pages/loginPage';
import { SignupPage } from './auth/pages/signupPage';
import { VerifyEmail } from './auth/pages/VerifyEmail';
import { ForgotPasswordPage } from './auth/pages/ForgotPassword';
import { EmailVerificationLandingPage } from './auth/pages/EmailVerification';
import { AuthRequired } from './auth/AuthRequired';
import { AcftPage } from './dashboard/components/CheckAcftPage';
import { Home } from './dashboard/components/Home';
import { ResetPasswordLandingPage } from './auth/pages/ResetPasswordLandingPage';

export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={
            <AuthRequired>
              <Home />
            </AuthRequired>
          }
        />
        <Route
          path='/score-checker'
          element={
            <AuthRequired>
              <AcftPage />
            </AuthRequired>
          }
        />
        <Route
          path='/user'
          element={
            <AuthRequired>
              <UserInfoPage />
            </AuthRequired>
          }
        />

        <Route path='/please-verify' element={<VerifyEmail />} />
        <Route
          path='/verify-email/:verificationString'
          element={<EmailVerificationLandingPage />}
        />
        <Route path='/forgot-password' element={<ForgotPasswordPage />} />
        <Route
          path='/reset-password/:resetCode'
          element={<ResetPasswordLandingPage />}
        />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
      </Routes>
    </Router>
  );
};
