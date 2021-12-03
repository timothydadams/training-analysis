import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserInfoPage } from './pages/UserInfoPage';
import { LoginPage } from './pages/loginPage';
import { SignupPage } from './pages/signupPage';
import { PrivateOutlet } from './auth/PrivateRoute';
import { AcftPage } from './pages/CheckAcftPage';

export const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<PrivateOutlet />} >
                   <Route path="" element={<AcftPage />} />
                   {/* <Route path="" element={<UserInfoPage />} /> */}
                </Route>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
            </Routes>
        </Router>
    );
}